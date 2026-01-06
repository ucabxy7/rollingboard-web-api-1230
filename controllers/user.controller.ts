import { NextFunction, Request, Response } from "express";

import { SearchUsersRequestDtoType, UserDtoSchema } from "@/dto/user.dto";
import { UserService } from "@/services/user.service";
import { paginationSchema } from "@/utils/pagination.utils";

export default class UsersController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

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
    console.log("database_url", process.env.DATABASE_URL);
    try {
      const { query } = req.body;
      const { page, pageSize } = req.query;
      const { users, total } = await this.userService.searchUsers(
        query,
        page,
        pageSize,
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
