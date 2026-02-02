import { Router } from "express";
import { authenticateAsUser } from "@/middlewares/authentication.middleware";
import { ProjectController } from "@/controllers/project.controller";
import {
  CreateProjectRequestSchema,
  UpdateProjectRequestSchema,
} from "@/dto/project.dto";
import { validateRequestBodyMiddleware } from "@/middlewares/validateRequestBodymiddleware";

const projectRouter = Router();
const projectController = new ProjectController();
projectRouter.get(
  "/projects",
  authenticateAsUser,
  projectController.getProjects,
);
projectRouter.post(
  "/projects",
  authenticateAsUser,
  validateRequestBodyMiddleware(CreateProjectRequestSchema),
  projectController.createProject,
);

projectRouter.patch(
  "/projects/:projectId",
  authenticateAsUser,
  validateRequestBodyMiddleware(UpdateProjectRequestSchema),
  projectController.updateProject,
);

projectRouter.get(
  "/projects/:projectId/memberships",
  authenticateAsUser,
  projectController.getMemberships,
);

projectRouter.delete(
  "/projects/:projectId",
  authenticateAsUser,
  projectController.deleteProject,
);
export default projectRouter;
