import { z } from "zod";
import { UserDtoSchema } from "./user.dto";

export const AddMembersRequestSchema = z.object({
  userIds: z.array(z.string().uuid()),
});

export type AddMembersRequestDto = z.infer<typeof AddMembersRequestSchema>;

export const MembersResponseSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
  projectId: z.string(),
  userId: z.string(),
  user: UserDtoSchema,
});
