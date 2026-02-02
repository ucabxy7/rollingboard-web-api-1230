import { Router } from "express";
import { authenticateAsUser } from "@/middlewares/authentication.middleware";
import UsersController from "@/controllers/user.controller";

const userRouter = Router();

const usersController = new UsersController();
userRouter.get("/users/me", authenticateAsUser, usersController.getCurrentUser);
userRouter.post(
  "/users/search",
  authenticateAsUser,
  usersController.searchUsers,
);

export default userRouter;
