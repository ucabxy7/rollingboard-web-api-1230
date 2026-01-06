import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validateRequestBodyMiddleware = <T>(schema: ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.safeParse(req.body);
    if (error) {
      // Client Side Error: Bad Request
      return res.status(400).json({ message: error.message });
    }
    next();
  };
};
