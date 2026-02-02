import { z } from "zod";

export const CreateProjectRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

export type CreateProjectRequestDto = z.infer<
  typeof CreateProjectRequestSchema
>;

export const UpdateProjectRequestSchema = CreateProjectRequestSchema.pick({
  name: true,
  description: true,
}).partial();

export type UpdateProjectRequestDto = z.infer<
  typeof UpdateProjectRequestSchema
>;

export const ProjectResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
});
export type ProjectResponseDto = z.infer<typeof ProjectResponseSchema>;
