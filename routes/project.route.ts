import { Router } from "express";
import { authenticateAsUser } from "@/middlewares/authentication.middleware";
import { ProjectController } from "@/controllers/project.controller";

const projectRouter = Router();
const projectController = new ProjectController();
projectRouter.get(
  "/projects",
  authenticateAsUser,
  projectController.getProjects,
);
export default projectRouter;
