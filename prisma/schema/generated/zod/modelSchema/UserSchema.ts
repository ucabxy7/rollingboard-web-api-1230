import { z } from 'zod';

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
  username: z.string(),
  email: z.string(),
  cognitoId: z.string(),
})

export type User = z.infer<typeof UserSchema>

export default UserSchema;
