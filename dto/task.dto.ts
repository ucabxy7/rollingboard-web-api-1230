import { z } from "zod";
// -- public schema
export const publicUserSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string().email(),
});
export const TaskIdRequestParamsSchema = z.object({
  id: z.string().uuid("Invalid task id"),
});
export const TaskResponseSchema = z.object({
  id: z.string().uuid("Invalid task id"),
  name: z.string(),
  description: z.string(),
  columnId: z.string().uuid("Invalid column Id"),
  assignedTo: publicUserSchema.optional(),
});
// 1.create schema
export const createTaskRequestBodySchema = z.object({
  name: z.string().min(1, "Task name is required"),
  description: z.string().min(1, "Task description is required"),
  columnId: z.string().uuid("Invalid column Id"),
  assignedToId: z.string().uuid("Invalid assignedTo id").optional(),
});
export const createTaskResponseSchema = TaskResponseSchema;

// 2.update schema
export const updateTaskRequestParamsSchema = TaskIdRequestParamsSchema;
export const updateTaskRequestBodySchema = z
  .object({
    name: z.string().min(1, "Task name is required").optional(),
    description: z.string().min(1, "Task description is required").optional(),
    columnId: z.string().uuid("Invalid column Id").optional(),
    assignedToId: z.string().uuid("Invalid assignedTo id").optional(),
  })
  .refine(data => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
export const udpateTaskResponseSchema = TaskResponseSchema;
// 3.get schema
export const getTaskRequestParamsSchema = TaskIdRequestParamsSchema;
export const getTaskResponseSchema = TaskResponseSchema;

// -- public dto
export type TaskResponseDto = z.infer<typeof TaskResponseSchema>;

//1. create dto
export type CreateTaskRequestBodyDto = z.infer<
  typeof createTaskRequestBodySchema
>;
export type CreateTaskResponseDto = TaskResponseDto;

// 2. update dto
export type UpdateTaskRequestParamsDto = z.infer<
  typeof updateTaskRequestParamsSchema
>;
export type UpdateTaskRequestBodyDto = z.infer<
  typeof updateTaskRequestBodySchema
>;
export type UpdateTaskResponseDto = TaskResponseDto;

//3. get dto
export type GetTaskRequestParamsDto = UpdateTaskRequestParamsDto;
export type GetTaskResponseDto = TaskResponseDto;
