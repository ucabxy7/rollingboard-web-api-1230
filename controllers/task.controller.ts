import { Request, Response, NextFunction } from "express";
import { TaskService } from "@/services/task.service";
import {
  CreateTaskRequestBodyDto,
  UpdateTaskRequestBodyDto,
  createTaskResponseSchema,
  udpateTaskResponseSchema,
  taskResponseSchema,
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
  updateTask = async (
    req: Request<{ taskId: string }, unknown, UpdateTaskRequestBodyDto>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { taskId } = req.params;
      const updatedTask = await taskService.updateTask(taskId, req.body);
      const response = await udpateTaskResponseSchema.parseAsync(updatedTask);
      return res.status(200).json({ task: response });
    } catch (error) {
      return next(error);
    }
  };
  getTasks = async (
    req: Request<{ columnId: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { columnId } = req.params;
      const fetchedTasks = await taskService.getTasks(columnId);
      const response = await taskResponseSchema
        .array()
        .parseAsync(fetchedTasks);
      return res.status(200).json({ tasks: response });
    } catch (error) {
      return next(error);
    }
  };
  deleteTask = async (
    req: Request<{ taskId: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { taskId } = req.params;
      await taskService.deleteTask(taskId);
      return res.status(204).json();
    } catch (error) {
      return next(error);
    }
  };
}
