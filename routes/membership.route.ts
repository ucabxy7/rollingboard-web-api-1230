import { Router } from "express";
import { authenticateAsUser } from "@/middlewares/authentication.middleware";
import { MembershipController } from "@/controllers/membership.controller";

const membershipRouter = Router();
const membershipController = new MembershipController();

membershipRouter.delete(
  "/memberships/:membershipId",
  authenticateAsUser,
  membershipController.deleteOneMembership,
);

export default membershipRouter;
