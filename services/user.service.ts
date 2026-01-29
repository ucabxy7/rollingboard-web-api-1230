import prisma from "@/prisma";
export class UserService {
  async updateAvatar(userId: string, avatarKey: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { avatar: avatarKey },
    });
  }
}
