import prisma from "@/prisma";
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
}
