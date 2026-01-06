import prisma from "@/prisma";
import { NotFoundError, UnauthorizedError } from "@/utils/error.utils";

export class MembershipService {
  async deleteMembership(id: string, userId: string) {
    const membership = await prisma.membership.findUnique({ where: { id } });

    if (!membership) {
      throw new NotFoundError("Membership not found");
    }

    const project = await prisma.project.findUnique({
      where: { id: membership.projectId },
      include: { memberships: true },
    });

    if (!project) {
      throw new NotFoundError("Project not found");
    }

    if (
      !project?.memberships.some(membership => membership.userId === userId)
    ) {
      throw new UnauthorizedError(
        "You are not authorized to delete this membership",
      );
    }

    if (project.createdBy !== userId && membership.userId !== userId) {
      throw new UnauthorizedError(
        "You are not authorized to delete this membership",
      );
    }

    await prisma.membership.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
