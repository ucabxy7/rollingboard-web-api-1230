import { Request, Response, NextFunction } from "express";
import { ColumnService } from "@/services/column.service";
import {
  ColumnResponseSchema,
  CreateColumnRequestParamsDto,
  CreateColumnRequestBodyDto,
} from "@/dto/column.dto";

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
      const { name, order } = req.body;
      const createdColumn = await columnService.createColumn(
        projectId,
        name,
        order,
      );
      const columnResponse =
        await ColumnResponseSchema.parseAsync(createdColumn);
      return res.status(201).json({ column: columnResponse });
    } catch (error) {
      return next(error);
    }
  };
}
