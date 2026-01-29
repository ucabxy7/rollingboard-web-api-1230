import { Request, Response, NextFunction } from "express";
import { UserService } from "@/services/user.service";
import { UserDtoSchema, SearchUsersRequestDtoType } from "@/dto/user.dto";
import { paginationSchema } from "@/utils/pagination.utils";

const userservice = new UserService();

export default class UsersController {
  // getCurrentUser do not need go to service level
  getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ user: UserDtoSchema.parse(req.user) });
    } catch (error) {
      return next(error);
    }
  };
  searchUsers = async (
    req: Request<
      unknown,
      unknown,
      SearchUsersRequestDtoType,
      { page?: string; pageSize?: string }
    >,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { query } = req.body;
      const { page, pageSize } = req.query;
      const pageNum = typeof page === "string" ? Number(page) : undefined;
      const pageSizeNum =
        typeof pageSize === "string" ? Number(pageSize) : undefined;
      const { users, total } = await userservice.searchUsers(
        query,
        pageNum,
        pageSizeNum,
      );

      const [usersResponse, paginationResponse] = await Promise.all([
        UserDtoSchema.array().parseAsync(users),
        paginationSchema.parseAsync({
          totalPages: pageSize ? Math.ceil(total / Number(pageSize)) : 1,
          totalItems: total,
          isLastPage:
            page && pageSize ? total <= Number(page) * Number(pageSize) : true,
        }),
      ]);
      return res
        .status(200)
        .json({ users: usersResponse, pagination: paginationResponse });
    } catch (error) {
      return next(error);
    }
  };
}
