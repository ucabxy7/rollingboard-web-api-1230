import { z } from "zod";

export const CreateProjectRequestDto = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

export type CreateProjectRequestDtoType = z.infer<
  typeof CreateProjectRequestDto
>;

export const UpdateProjectRequestDto = CreateProjectRequestDto.partial();

export type UpdateProjectRequestDtoType = z.infer<
  typeof UpdateProjectRequestDto
>;

export const ProjectResponseDto = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
});

export type ProjectResponseDtoType = z.infer<typeof ProjectResponseDto>;
