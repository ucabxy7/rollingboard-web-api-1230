import { Request, Response, NextFunction } from "express";
import { TaskService } from "@/services/task.service";
import {
  createTaskResponseSchema,
  CreateTaskRequestBodyDto,
} from "@/dto/task.dto";

// frontend: request dto = backend: request dto
// backend: response schema = frontend : domain model

// controller send req.body directly to service level.
// controller get TaskEntity | PrismaTask | ORM Model return from service level and parse it.

const taskService = new TaskService();
export class TaskController {
  createTask = async (
    req: Request<unknown, unknown, CreateTaskRequestBodyDto>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const newtask = await taskService.createTask(req.body);
      const response = await createTaskResponseSchema.parseAsync(newtask);
      return res.status(201).json({ task: response });
    } catch (error) {
      return next(error);
    }
  };
}
