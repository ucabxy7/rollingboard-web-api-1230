import { Router } from "express";

import UsersController from "@/controllers/user.controller";
import { SearchUsersRequestDtoSchema } from "@/dto/user.dto";
import { authenticateAsUser } from "@/middlewares/authentication.middleware";
import { validateRequestBodyMiddleware } from "@/middlewares/validateRequestBodyMiddleware";
import { UserService } from "@/services/user.service";

const userRouter = Router();

const userService = new UserService();
const usersController = new UsersController(userService);

userRouter.get("/users/me", authenticateAsUser, usersController.getCurrentUser);

userRouter.post(
  "/users/search",
  validateRequestBodyMiddleware(SearchUsersRequestDtoSchema),
  usersController.searchUsers,
);

export default userRouter;
