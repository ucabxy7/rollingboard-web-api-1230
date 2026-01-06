import { NextFunction, Request, Response } from "express";

import {
  AddMembersRequestDtoType,
  MembershipResponseDtoSchema,
} from "@/dto/memberships.dto";
import {
  CreateProjectRequestDtoType,
  ProjectResponseDto,
  UpdateProjectRequestDtoType,
} from "@/dto/project.dto";
import { ProjectService } from "@/services/project.service";
import { paginationSchema } from "@/utils/pagination.utils";

export class ProjectController {
  private readonly projectService: ProjectService;

  constructor(projectService: ProjectService) {
    this.projectService = projectService;
  }
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
      const user = req.user!;
      const { page, pageSize } = req.query;
      console.log(page, pageSize);

      const { projects, total } = await this.projectService.getProjects(
        user.id,
        page,
        pageSize,
      );

      const [projectsResponse, paginationResponse] = await Promise.all([
        ProjectResponseDto.array().parseAsync(projects),
        paginationSchema.parseAsync({
          totalPages: pageSize ? Math.ceil(total / Number(pageSize)) : 1,
          totalItems: total,
          isLastPage:
            page && pageSize ? total <= Number(page) * Number(pageSize) : true,
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
    req: Request<unknown, unknown, CreateProjectRequestDtoType>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = req.user!;
      const { name, description } = req.body;

      const project = await this.projectService.createProject(
        name,
        description,
        user.id,
      );

      const projectResponse = await ProjectResponseDto.parseAsync(project);

      return res.status(201).json({ project: projectResponse });
    } catch (error) {
      return next(error);
    }
  };

  getProjectById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const user = req.user!;
      const project = await this.projectService.getProjectById(id, user.id);
      const projectResponse = await ProjectResponseDto.parseAsync(project);
      return res.status(200).json({ project: projectResponse });
    } catch (error) {
      return next(error);
    }
  };

  updateProject = async (
    req: Request<{ id: string }, unknown, UpdateProjectRequestDtoType>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const user = req.user!;
      const project = await this.projectService.updateProject(id, user.id, {
        name,
        description,
      });
      const projectResponse = await ProjectResponseDto.parseAsync(project);
      return res.status(200).json({ project: projectResponse });
    } catch (error) {
      return next(error);
    }
  };

  deleteProject = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const user = req.user!;
      await this.projectService.deleteProject(id, user.id);
      return res.status(204).json({ success: true });
    } catch (error) {
      return next(error);
    }
  };

  getMemberships = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const user = req.user!;
      const memberships = await this.projectService.getMembershipsOfProject(
        id,
        user.id,
      );
      const membershipsResponse =
        await MembershipResponseDtoSchema.array().parseAsync(memberships);
      return res.status(200).json({ memberships: membershipsResponse });
    } catch (error) {
      return next(error);
    }
  };

  addMembersToProject = async (
    req: Request<{ id: string }, unknown, AddMembersRequestDtoType>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const { userIds } = req.body;
      const user = req.user!;
      const memberships = await this.projectService.addMembersToProject(
        id,
        user.id,
        userIds,
      );
      const membershipsResponse =
        await MembershipResponseDtoSchema.array().parseAsync(memberships);
      return res.status(200).json({ memberships: membershipsResponse });
    } catch (error) {
      return next(error);
    }
  };
}
