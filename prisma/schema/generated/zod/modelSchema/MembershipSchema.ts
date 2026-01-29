import { z } from 'zod';

/////////////////////////////////////////
// MEMBERSHIP SCHEMA
/////////////////////////////////////////

export const MembershipSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
  projectId: z.string(),
  userId: z.string(),
})

export type Membership = z.infer<typeof MembershipSchema>

export default MembershipSchema;
