import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateRequestParamsMiddleware =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid request params",
        errors: result.error.flatten(),
      });
    }

    req.params = result.data as typeof req.params;

    next();
  };
