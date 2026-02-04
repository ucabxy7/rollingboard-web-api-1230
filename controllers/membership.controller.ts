import { Request, Response, NextFunction } from "express";
import { MembershipService } from "@/services/membership.service";

const membershipService = new MembershipService();
export class MembershipController {
  deleteOneMembership = async (
    req: Request<{ membershipId: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = req.user!;
      const { membershipId } = req.params;
      await membershipService.deleteMemebership(membershipId, user.id);
      return res.status(204).json();
    } catch (error) {
      return next(error);
    }
  };
}
