import { Request, Response, NextFunction } from "express";
import { ProjectService } from "@/services/project.service";
import {
  ProjectResponseSchema,
  CreateProjectRequestDto,
  UpdateProjectRequestDto,
} from "@/dto/project.dto";
import { MembersResponseSchema } from "@/dto/membership.dto";
import { paginationSchema } from "@/utils/pagination.utils";

const projectService = new ProjectService();
export class ProjectController {
  getProjects = async (
    req: Request<
      unknown,
      unknown,
      unknown,
      { page?: string; pageSize?: string }
    >,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      // 1. extract input parameters for service level.
      const user = req.user!;
      const { page, pageSize } = req.query;
      const pageNum = typeof page === "string" ? Number(page) : undefined;
      const pageSizeNum =
        typeof pageSize === "string" ? Number(pageSize) : undefined;
      // 2. get projects from service level.
      const { projects, total } = await projectService.getProjects(
        user.id,
        pageNum,
        pageSizeNum,
      );
      // 3. parse response from service level output.
      const [projectsResponse, paginationResponse] = await Promise.all([
        ProjectResponseSchema.array().parseAsync(projects),
        paginationSchema.parseAsync({
          totalPages:
            pageSizeNum && total > 0 ? Math.ceil(total / pageSizeNum) : 1,
          totalItems: total,
          isLastPage:
            pageNum && pageSizeNum ? total <= pageNum * pageSizeNum : true,
        }),
      ]);
      return res
        .status(200)
        .json({ projects: projectsResponse, pagination: paginationResponse });
    } catch (error) {
      return next(error);
    }
  };
  createProject = async (
    req: Request<unknown, unknown, CreateProjectRequestDto>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = req.user!;
      const { name, description } = req.body;
      const project = await projectService.createProject(
        user.id,
        name,
        description,
      );
      const projectResponse = await ProjectResponseSchema.parseAsync(project);
      return res.status(201).json({ project: projectResponse });
    } catch (error) {
      return next(error);
    }
  };
  updateProject = async (
    req: Request<{ projectId: string }, unknown, UpdateProjectRequestDto>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = req.user!;
      const { projectId } = req.params;
      const payload = req.body;
      const updatedProject = await projectService.updateProject(
        projectId,
        user.id,
        payload,
      );
      const projectResponse =
        await ProjectResponseSchema.parseAsync(updatedProject);
      return res.status(200).json({ project: projectResponse });
    } catch (error) {
      return next(error);
    }
  };
  getMemberships = async (
    req: Request<{ projectId: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = req.user!;
      const { projectId } = req.params;
      const memberships = await projectService.getMembershipsOfaProject(
        projectId,
        user.id,
      );
      const membershipResponse =
        await MembersResponseSchema.array().parseAsync(memberships);
      return res.status(200).json({ memberships: membershipResponse });
    } catch (error) {
      return next(error);
    }
  };
}
