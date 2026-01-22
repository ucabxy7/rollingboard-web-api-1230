import { Request, Response, NextFunction } from "express";
import { UserDtoSchema } from "@/dto/user.dto";

export default class UsersController {
  // getCurrentUser do not need go to service level
  getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({ user: UserDtoSchema.parse(req.user) });
    } catch (error) {
      return next(error);
    }
  };
}
