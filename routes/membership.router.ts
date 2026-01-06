import { Router } from "express";

import MembershipController from "@/controllers/membership.controller";
import { authenticateAsUser } from "@/middlewares/authentication.middleware";
import { MembershipService } from "@/services/membership.service";

const membershipRouter = Router();

const membershipService = new MembershipService();
const membershipController = new MembershipController(membershipService);

membershipRouter.delete(
  "/memberships/:id",
  authenticateAsUser,
  membershipController.deleteMembership,
);

export default membershipRouter;
