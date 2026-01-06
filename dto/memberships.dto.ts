import { z } from "zod";

import { UserDtoSchema } from "./user.dto";

export const AddMembersRequestDtoSchema = z.object({
  userIds: z.array(z.string().uuid()),
});

export type AddMembersRequestDtoType = z.infer<
  typeof AddMembersRequestDtoSchema
>;

export const MembershipResponseDtoSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
  projectId: z.string(),
  userId: z.string(),
  user: UserDtoSchema,
});
