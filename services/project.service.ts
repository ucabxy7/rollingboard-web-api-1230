import prisma from "@/prisma";
import {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
} from "@/utils/error.utils";

export class ProjectService {
  async getProjects(userId: string, page?: number, pageSize?: number) {
    const shouldPaginate =
      typeof page === "number" &&
      typeof pageSize === "number" &&
      Number.isInteger(page) &&
      Number.isInteger(pageSize) &&
      page > 0 &&
      pageSize > 0;

    const where = {
      deletedAt: null,
      memberships: {
        some: {
          userId,
          deletedAt: null,
        },
      },
    };
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip: shouldPaginate ? (page - 1) * pageSize : undefined,
        take: shouldPaginate ? pageSize : undefined,
      }),
      prisma.project.count({
        where,
      }),
    ]);
    return { projects, total };
  }
  async createProject(userId: string, name: string, description: string) {
    return await prisma.$transaction(async tx => {
      const project = await tx.project.create({
        data: {
          name,
          description,
          createdBy: userId,
        },
      });
      await tx.membership.create({
        data: {
          userId,
          projectId: project.id,
        },
      });
      return project;
    });
  }

  async getProjectById(projectId: string, userId: string) {
    const uniqueProject = await prisma.project.findFirst({
      where: { id: projectId, deletedAt: null },
      include: { memberships: { where: { deletedAt: null } } },
    });

    if (!uniqueProject) {
      throw new NotFoundError("Project not found!");
    }
    if (!uniqueProject.memberships.some(m => m.userId === userId)) {
      throw new UnauthorizedError(
        "You are not authorized to access this project!",
      );
    }
    return uniqueProject;
  }
  async updateProject(
    projectId: string,
    userId: string,
    payload: {
      name?: string;
      description?: string;
    },
  ) {
    const { name, description } = payload;
    await this.getProjectById(projectId, userId);
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        name,
        description,
      },
    });
    return updatedProject;
  }
  async getMembershipsOfaProject(projectId: string, userId: string) {
    await this.getProjectById(projectId, userId);
    const memberships = await prisma.membership.findMany({
      where: { projectId, deletedAt: null },
      include: { user: true },
    });
    return memberships;
  }
  async deleteProject(projectId: string, userId: string) {
    const now = new Date();
    await prisma.$transaction(async tx => {
      await this.getProjectById(projectId, userId);
      await tx.project.update({
        where: { id: projectId },
        data: { deletedAt: now },
      });
      await tx.membership.updateMany({
        where: { projectId, deletedAt: null },
        data: { deletedAt: now },
      });
    });
  }
  async addMembersToProject(
    projectId: string,
    userId: string,
    userIds: string[],
  ) {
    await this.getProjectById(projectId, userId);
    // Check existing memberships (make sure none of userId already in memberships of this project)
    const existingMemberships = await prisma.membership.findMany({
      where: { projectId, userId: { in: userIds }, deletedAt: null },
    });
    if (existingMemberships.length > 0) {
      throw new BadRequestError(
        "Some users are already members of the project",
      );
    }
    // use transaction to make sure: (1) new user are added (2) once-added users are restored(deletedAt set to null)
    await prisma.$transaction(async tx => {
      for (const userId of userIds) {
        await tx.membership.upsert({
          where: {
            projectId_userId: {
              projectId,
              userId,
            },
          },
          update: {
            deletedAt: null,
          },
          create: {
            projectId,
            userId,
          },
        });
      }
    });
    const updatedMemberships = await this.getMembershipsOfaProject(
      projectId,
      userId,
    );
    return updatedMemberships;
  }
}
