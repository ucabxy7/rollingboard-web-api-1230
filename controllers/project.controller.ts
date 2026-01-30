import { Request, Response, NextFunction } from "express";
import { ProjectService } from "@/services/project.service";
import { ProjectResponseSchema } from "@/dto/project.dto";
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
}
