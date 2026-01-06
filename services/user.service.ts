import prisma from "@/prisma";

export class UserService {
  async searchUsers(query: string, page?: string, pageSize?: string) {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: {
          OR: [{ username: { search: query } }, { email: { search: query } }],
        },
        skip: page ? (Number(page) - 1) * Number(pageSize) : undefined,
        take: pageSize ? Number(pageSize) : undefined,
      }),
      prisma.user.count({
        where: {
          OR: [{ username: { search: query } }, { email: { search: query } }],
        },
      }),
    ]);

    return { users, total };
  }
}
