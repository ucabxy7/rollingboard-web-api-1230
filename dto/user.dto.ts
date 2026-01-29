import { z } from "zod";
import UserSchema from "@/prisma/schema/generated/zod/modelSchema/UserSchema";

export const UserDtoSchema = UserSchema.pick({
  id: true,
  username: true,
  email: true,
});
export type UserDtoType = z.infer<typeof UserDtoSchema>;

export const SearchUsersRequestDtoSchema = z.object({
  query: z.string().min(1, "Query must be at least 1 character long"),
});
export type SearchUsersRequestDtoType = z.infer<
  typeof SearchUsersRequestDtoSchema
>;
