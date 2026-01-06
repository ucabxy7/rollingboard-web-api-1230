import prisma from "@/prisma";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "@/utils/error.utils";

export class ProjectService {
  async getProjects(userId: string, page?: string, pageSize?: string) {
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where: { deletedAt: null, memberships: { some: { userId } } },
        orderBy: { createdAt: "desc" },
        skip: page ? (Number(page) - 1) * Number(pageSize) : undefined,
        take: pageSize ? Number(pageSize) : undefined,
      }),
      prisma.project.count({
        where: { deletedAt: null, memberships: { some: { userId } } },
      }),
    ]);

    return { projects, total };
  }

  async getProjectById(id: string, userId: string) {
    const project = await prisma.project.findUnique({
      where: { id, deletedAt: null },
      include: {
        memberships: true,
      },
    });

    if (!project) {
      throw new NotFoundError("Project not found");
    }

    if (!project.memberships.some(membership => membership.userId === userId)) {
      throw new UnauthorizedError(
        "You are not authorized to access this project",
      );
    }

    return project;
  }

  async updateProject(
    id: string,
    userId: string,
    payload: { name?: string; description?: string },
  ) {
    const { name, description } = payload;

    await this.getProjectById(id, userId);

    const updatedProject = await prisma.project.update({
      where: { id },
      data: { name, description },
    });

    return updatedProject;
  }

  async createProject(name: string, description: string, userId: string) {
    // transaction
    const project = await prisma.$transaction(async tx => {
      const project = await tx.project.create({
        data: {
          name,
          description,
          createdBy: userId,
        },
      });

      await tx.membership.create({
        data: {
          projectId: project.id,
          userId,
        },
      });

      return project;
    });

    return project;
  }

  async deleteProject(id: string, userId: string) {
    await this.getProjectById(id, userId);

    await prisma.project.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async getMembershipsOfProject(id: string, userId: string) {
    await this.getProjectById(id, userId);

    const memberships = await prisma.membership.findMany({
      where: { projectId: id, deletedAt: null },
      include: { user: true },
    });

    return memberships;
  }

  async addMembersToProject(id: string, userId: string, userIds: string[]) {
    await this.getProjectById(id, userId);

    const existingMemberships = await prisma.membership.findMany({
      where: { projectId: id, userId: { in: userIds }, deletedAt: null },
    });

    if (existingMemberships.length > 0) {
      throw new BadRequestError(
        "Some users are already members of the project",
      );
    }

    await prisma.$transaction(async tx => {
      for (const userId of userIds) {
        await tx.membership.upsert({
          where: { projectId_userId: { projectId: id, userId } },
          update: { deletedAt: null },
          create: { projectId: id, userId },
        });
      }
    });

    const memberships = await this.getMembershipsOfProject(id, userId);

    return memberships;
  }
}
