import { Router } from "express";

import { ProjectController } from "@/controllers/project.controller";
import { AddMembersRequestDtoSchema } from "@/dto/memberships.dto";
import {
  CreateProjectRequestDto,
  UpdateProjectRequestDto,
} from "@/dto/project.dto";
import { authenticateAsUser } from "@/middlewares/authentication.middleware";
import { validateRequestBodyMiddleware } from "@/middlewares/validateRequestBodyMiddleware";
import { ProjectService } from "@/services/project.service";

const projectRouter = Router();

const projectService = new ProjectService();
const projectController = new ProjectController(projectService);

projectRouter.get(
  "/projects",
  authenticateAsUser,
  projectController.getProjects,
);

projectRouter.post(
  "/projects",
  authenticateAsUser,
  validateRequestBodyMiddleware(CreateProjectRequestDto),
  projectController.createProject,
);

projectRouter.get(
  "/projects/:id",
  authenticateAsUser,
  projectController.getProjectById,
);

projectRouter.patch(
  "/projects/:id",
  authenticateAsUser,
  validateRequestBodyMiddleware(UpdateProjectRequestDto),
  projectController.updateProject,
);

projectRouter.delete(
  "/projects/:id",
  authenticateAsUser,
  projectController.deleteProject,
);

projectRouter.get(
  "/projects/:id/memberships",
  authenticateAsUser,
  projectController.getMemberships,
);

projectRouter.post(
  "/projects/:id/add-members",
  authenticateAsUser,
  validateRequestBodyMiddleware(AddMembersRequestDtoSchema),
  projectController.addMembersToProject,
);

export default projectRouter;
