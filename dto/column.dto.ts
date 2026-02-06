import { z } from "zod";

export const CreateColumnRequestParamsSchema = z.object({
  projectId: z.string().uuid("Invalid project id"),
});

export const CreateColumnRequestBodySchema = z.object({
  name: z.string().min(1, "Column name is required"),
  order: z.number().int().nonnegative(),
});

export const UpdateColumnNameRequestBodySchema = z.object({
  name: z.string().min(1, "Column name is required"),
});

export const SwapColumnOrderRequestBodySchema = z.object({
  ids: z
    .tuple([z.string().uuid(), z.string().uuid()])
    .refine(([a, b]) => a !== b, {
      message: "ids must be two different column ids",
    }),
});

export const ColumnResponseSchema = z.object({
  id: z.string().uuid("invalid column id"),
  name: z.string(),
  order: z.number().int().nonnegative(),
});

export type CreateColumnRequestParamsDto = z.infer<
  typeof CreateColumnRequestParamsSchema
>;
export type CreateColumnRequestBodyDto = z.infer<
  typeof CreateColumnRequestBodySchema
>;

export type UpdateColumnNameRequestBodyDto = z.infer<
  typeof UpdateColumnNameRequestBodySchema
>;

export type SwapColumnOrderRequestBodyDto = z.infer<
  typeof SwapColumnOrderRequestBodySchema
>;

export type ColumnResponseDto = z.infer<typeof ColumnResponseSchema>;
