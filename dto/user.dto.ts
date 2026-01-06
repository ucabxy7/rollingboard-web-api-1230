import { z } from "zod";

import { UserSchema } from "@/prisma/schema/generated/zod";

export const SearchUsersRequestDtoSchema = z.object({
  query: z.string(),
});

export type SearchUsersRequestDtoType = z.infer<
  typeof SearchUsersRequestDtoSchema
>;

export const UserDtoSchema = UserSchema.pick({
  id: true,
  username: true,
  email: true,
});

export type UserDtoType = z.infer<typeof UserDtoSchema>;
