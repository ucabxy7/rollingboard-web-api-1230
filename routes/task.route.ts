import { Router } from "express";
import { authenticateAsUser } from "@/middlewares/authentication.middleware";
import { TaskController } from "@/controllers/task.controller";
import { createTaskRequestBodySchema } from "@/dto/task.dto";
import { validateRequestParamsMiddleware } from "@/middlewares/validateRequestParamsMiddleware";
import { validateRequestBodyMiddleware } from "@/middlewares/validateRequestBodyMiddleware";

const taskRouter = Router();
const taskController = new TaskController();

taskRouter.post(
  "/task",
  authenticateAsUser,
  validateRequestBodyMiddleware(createTaskRequestBodySchema);
  taskController.createTask,
);
export default taskRouter;