import { z } from "zod";

export const paginationSchema = z.object({
  totalPages: z.number(),
  totalItems: z.number(),
  isLastPage: z.boolean(),
});

export type PaginationSchemaType = z.infer<typeof paginationSchema>;
