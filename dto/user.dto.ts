import { z } from "zod";
import UserSchema from "@/prisma/schema/generated/zod/modelSchema/UserSchema";

export const UserDtoSchema = UserSchema.pick({
  id: true,
  username: true,
  email: true,
});
export type UserDtoSchema = z.infer<typeof UserDtoSchema>;
