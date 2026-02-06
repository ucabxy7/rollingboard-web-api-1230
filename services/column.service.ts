import prisma from "@/prisma";
import {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
} from "@/utils/error.utils";

import {
  CreateColumnRequestBodyDto,
  UpdateColumnNameRequestBodyDto,
  SwapColumnOrderRequestBodyDto,
} from "@/dto/column.dto";

export class ColumnService {
  async getColumns(projectId: string) {
    const project = await prisma.project.findFirst({
      where: { id: projectId, deletedAt: null },
    });
    if (!project) {
      throw new NotFoundError("Project not found");
    }
    const columns = await prisma.column.findMany({
      where: { projectId, deletedAt: null },
      orderBy: { order: "asc" },
    });
    return columns;
  }

  async createColumn(projectId: string, input: CreateColumnRequestBodyDto) {
    const { name, order } = input;
    const project = await prisma.project.findFirst({
      where: { id: projectId, deletedAt: null },
    });

    if (!project) {
      throw new NotFoundError("Project not found");
    }
    // check whether this order column of this project exists.
    const existedColumn = await prisma.column.findFirst({
      where: { projectId, order, deletedAt: null },
    });
    if (existedColumn) {
      throw new BadRequestError("Column order already exists in this project");
    }
    const column = await prisma.column.create({
      data: {
        name,
        order,
        projectId,
      },
    });
    return column;
  }
  // update 1: only update name
  async updateName(columnId: string, input: UpdateColumnNameRequestBodyDto) {
    const { name } = input;
    const column = await prisma.column.findFirst({
      where: { id: columnId, deletedAt: null },
    });
    if (!column) {
      throw new NotFoundError("Column not found");
    }
    const updatedColumn = await prisma.column.update({
      where: { id: columnId },
      data: { name },
    });
    return updatedColumn;
  }
  // update 2: only swap order
  async swapOrder(projectId: string, input: SwapColumnOrderRequestBodyDto) {
    const [idA, idB] = input.ids;
    if (idA === idB) return;
    await prisma.$transaction(async tx => {
      const colA = await tx.column.findFirst({
        where: { id: idA, projectId, deletedAt: null },
      });
      const colB = await tx.column.findFirst({
        where: { id: idB, projectId, deletedAt: null },
      });
      if (!colA || !colB) {
        throw new NotFoundError("Invalid column ids provided");
      }
      // swap order
      const tempOrder = colA.order;

      await tx.column.update({
        where: { id: idA },
        data: { order: colB.order },
      });
      await tx.column.update({
        where: { id: idB },
        data: { order: tempOrder },
      });
    });
  }

  // soft delete
  async deleteColumn(columnId: string) {
    const column = await prisma.column.findFirst({
      where: { id: columnId, deletedAt: null },
    });
    if (!column) {
      throw new NotFoundError("Column not found");
    }
    await prisma.column.update({
      where: { id: columnId },
      data: { deletedAt: new Date() },
    });
    // TODO: also soft delete all tasks under this column (after introducing tasks)
  }
}
