import { Request, Response, NextFunction } from "express";
import { ColumnService } from "@/services/column.service";
import {
  ColumnResponseSchema,
  CreateColumnRequestParamsDto,
  CreateColumnRequestBodyDto,
  UpdateColumnNameRequestBodyDto,
} from "@/dto/column.dto";

// frontend: request dto = backend: request dto
// backend: response schema = frontend : domain model

// controller send req.body directly to service level.
// controller get ColumnEntity | PrismaColumn | ORM Model return from service level and parse it.

const columnService = new ColumnService();
export class ColumnController {
  getColumns = async (
    req: Request<{ projectId: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { projectId } = req.params;
      const fetchedColumns = await columnService.getColumns(projectId);
      const columnsResponse =
        await ColumnResponseSchema.array().parseAsync(fetchedColumns);
      return res.status(200).json({ columns: columnsResponse });
    } catch (error) {
      return next(error);
    }
  };
  createColumn = async (
    req: Request<
      CreateColumnRequestParamsDto,
      unknown,
      CreateColumnRequestBodyDto
    >,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { projectId } = req.params;
      const createdColumn = await columnService.createColumn(
        projectId,
        req.body,
      );
      const columnResponse =
        await ColumnResponseSchema.parseAsync(createdColumn);
      return res.status(201).json({ column: columnResponse });
    } catch (error) {
      return next(error);
    }
  };
  updateColumnName = async (
    req: Request<{ columnId: string }, unknown, UpdateColumnNameRequestBodyDto>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { columnId } = req.params;
      const updatedColumn = await columnService.updateName(columnId, req.body);
      const columnResponse =
        await ColumnResponseSchema.parseAsync(updatedColumn);
      return res.status(200).json({ column: columnResponse });
    } catch (error) {
      return next(error);
    }
  };
  deleteColumn = async (
    req: Request<{ columnId: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { columnId } = req.params;
      await columnService.deleteColumn(columnId);
      return res.status(204).json();
    } catch (error) {
      return next(error);
    }
  };
}
