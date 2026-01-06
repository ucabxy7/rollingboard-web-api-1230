import { NextFunction, Request, Response } from "express";

import { MembershipService } from "@/services/membership.service";

export default class MembershipController {
  private readonly membershipService: MembershipService;

  constructor(membershipService: MembershipService) {
    this.membershipService = membershipService;
  }

  deleteMembership = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const user = req.user!;
      await this.membershipService.deleteMembership(id, user.id);
      return res.status(204).json({ success: true });
    } catch (error) {
      return next(error);
    }
  };
}
