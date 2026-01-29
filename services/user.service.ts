import prisma from "@/prisma";
export class UserService {
  async searchUsers(query: string, page?: number, pageSize?: number) {
    const shouldPaginate =
      typeof page === "number" &&
      typeof pageSize === "number" &&
      Number.isInteger(page) &&
      Number.isInteger(pageSize) &&
      page > 0 &&
      pageSize > 0;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: {
          OR: [{ username: { search: query } }, { email: { search: query } }],
        },
        skip: shouldPaginate ? (page - 1) * pageSize : undefined,
        take: shouldPaginate ? pageSize : undefined,
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
