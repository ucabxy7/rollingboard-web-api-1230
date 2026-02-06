import prisma from "@/prisma";
import {
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
} from "@/utils/error.utils";

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

  async createColumn(projectId: string, name: string, order: number) {
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
