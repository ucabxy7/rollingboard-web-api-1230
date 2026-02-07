import { Router } from "express";
import { authenticateAsUser } from "@/middlewares/authentication.middleware";
import { TaskController } from "@/controllers/task.controller";
import {
  createTaskRequestBodySchema,
  updateTaskRequestBodySchema,
} from "@/dto/task.dto";
import { validateRequestParamsMiddleware } from "@/middlewares/validateRequestParamsMiddleware";
import { validateRequestBodyMiddleware } from "@/middlewares/validateRequestBodyMiddleware";

const taskRouter = Router();
const taskController = new TaskController();

taskRouter.post(
  "/task",
  authenticateAsUser,
  validateRequestBodyMiddleware(createTaskRequestBodySchema),
  taskController.createTask,
);
taskRouter.patch(
  "/task/:taskId",
  authenticateAsUser,
  validateRequestBodyMiddleware(updateTaskRequestBodySchema),
  taskController.updateTask,
);

taskRouter.get(
  "/column/:columnId/tasks",
  authenticateAsUser,
  taskController.getTasks,
);

export default taskRouter;
