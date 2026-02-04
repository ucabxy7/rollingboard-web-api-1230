import prisma from "@/prisma";
import { NotFoundError, UnauthorizedError } from "@/utils/error.utils";

export class MembershipService {
  async deleteMemebership(membershipId: string, userId: string) {
    const membership = await prisma.membership.findUnique({
      where: { id: membershipId, deletedAt: null },
    });
    // validate 1: membership exists and not deleted.
    if (!membership) {
      throw new NotFoundError("Membership not found");
    }
    // validate 2: project of the membership exist and not deleted.
    const project = await prisma.project.findUnique({
      where: { id: membership.projectId, deletedAt: null },
      include: { memberships: true },
    });
    if (!project) {
      throw new NotFoundError("project of this membership not found");
    }

    // validate 3: current user already in the memberships of this project.
    // Remember: unique project has many memberships but membership only refer the one you want to delete!
    // so we need to check whether memberships of this project include the current user.
    if (!project.memberships.some(m => m.userId === userId)) {
      throw new UnauthorizedError(
        "You are not authorized to delete this membership (since you are not in this project's membership)",
      );
    }
    // validate 4: the creator of the project & membership has to be this user.
    const isProjectOwner = project.createdBy === userId;
    const isMembershipOwner = membership.userId === userId;
    if (!isProjectOwner && !isMembershipOwner) {
      throw new UnauthorizedError(
        "You are not authorized to delete this membership (since you are not the creator of the project & membership)",
      );
    }
    // actual action: soft delete the membership.
    await prisma.membership.update({
      where: { id: membershipId },
      data: { deletedAt: new Date() },
    });
  }
}
