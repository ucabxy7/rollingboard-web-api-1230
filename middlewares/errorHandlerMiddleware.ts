import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

import { HttpError } from "@/utils/error.utils";

export const errorHandlerMiddleware: ErrorRequestHandler = (
  error: unknown,
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(error);
  if (error instanceof Error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
  return next();
};
