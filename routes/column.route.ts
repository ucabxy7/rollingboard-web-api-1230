import { Router } from "express";
import { authenticateAsUser } from "@/middlewares/authentication.middleware";
import { ColumnController } from "@/controllers/column.controller";
import {
  CreateColumnRequestBodySchema,
  CreateColumnRequestParamsSchema,
} from "@/dto/column.dto";
import { validateRequestParamsMiddleware } from "@/middlewares/validateRequestParamsMiddleware";
import { validateRequestBodyMiddleware } from "@/middlewares/validateRequestBodyMiddleware";

const columnRouter = Router();
const columnController = new ColumnController();

columnRouter.get(
  "/projects/:projectId/columns",
  authenticateAsUser,
  columnController.getColumns,
);

columnRouter.post(
  "/projects/:projectId/column",
  authenticateAsUser,
  validateRequestParamsMiddleware(CreateColumnRequestParamsSchema),
  validateRequestBodyMiddleware(CreateColumnRequestBodySchema),
  columnController.createColumn,
);
columnRouter.delete(
  "/columns/:columnId",
  authenticateAsUser,
  columnController.deleteColumn,
);

export default columnRouter;
