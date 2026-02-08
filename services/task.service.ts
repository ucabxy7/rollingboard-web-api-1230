import prisma from "@/prisma";
import {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
} from "@/utils/error.utils";

import {
  CreateTaskRequestBodyDto,
  UpdateTaskRequestBodyDto,
} from "@/dto/task.dto";
import { date } from "zod";

export class TaskService {
  async createTask(input: CreateTaskRequestBodyDto) {
    const { columnId, name, description, assignedToId } = input;
    // find column
    const column = await prisma.column.findFirst({
      where: { id: columnId, deletedAt: null },
      select: { id: true },
    });
    if (!column) {
      throw new NotFoundError("column not found");
    }
    // calculate position
    if (assignedToId) {
      const user = await prisma.user.findFirst({
        where: { id: assignedToId, deletedAt: null },
        select: { id: true },
      });
      if (!user) {
        throw new NotFoundError("assignedTo user not found");
      }
    }
    const lastTask = await prisma.task.findFirst({
      where: {
        columnId,
        deletedAt: null,
      },
      orderBy: {
        position: "desc",
      },
      select: {
        position: true,
      },
    });
    const position = lastTask ? lastTask.position + 1 : 0;
    const task = await prisma.task.create({
      data: {
        name,
        description,
        columnId,
        position,
        assignedToId: assignedToId ?? undefined,
      },
      include: {
        assignedTo: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
    return task;
  }
  // this update do not change position
  async updateTask(taskId: string, input: UpdateTaskRequestBodyDto) {
    const { name, description, assignedToId } = input;
    // validate existing task
    const task = await prisma.task.findFirst({
      where: { id: taskId, deletedAt: null, column: { deletedAt: null } },
    });
    if (!task) {
      throw new NotFoundError("task not found");
    }
    // validate assignee
    if (assignedToId) {
      const countExistingUser = await prisma.user.count({
        where: { id: assignedToId, deletedAt: null },
      });
      if (countExistingUser == 0) {
        throw new NotFoundError("assignedTo user not found");
      }
    }
    return prisma.task.update({
      where: { id: taskId },
      data: {
        name,
        description,
        assignedToId: assignedToId ?? undefined,
      },
      include: {
        assignedTo: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
  }
  async getTasks(columnId: string) {
    // only getTasks which are under valid column.
    const column = await prisma.column.findFirst({
      where: { id: columnId, deletedAt: null },
      select: { id: true },
    });
    if (!column) {
      throw new NotFoundError("the related column not found");
    }

    // return tasks belong to the valid column .
    return prisma.task.findMany({
      where: { columnId, deletedAt: null },
      orderBy: { position: "asc" },
      include: {
        assignedTo: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
  }
  async deleteTask(taskId: string) {
    // task itself
    const task = await prisma.task.findFirst({
      where: { id: taskId, deletedAt: null },
      select: { id: true },
    });
    if (!task) {
      throw new NotFoundError("task not found");
    }
    await prisma.task.update({
      where: { id: taskId },
      data: {
        deletedAt: new Date(),
      },
    });
    // find related column and delete task from it.
  }
}
