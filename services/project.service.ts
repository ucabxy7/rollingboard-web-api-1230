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
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where: { memberships: { some: { userId, deletedAt: null } } },
        skip: shouldPaginate ? (page - 1) * pageSize : undefined,
        take: shouldPaginate ? pageSize : undefined,
      }),
      prisma.project.count({
        where: { memberships: { some: { userId, deletedAt: null } } },
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
      include: { memberships: true },
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
}
