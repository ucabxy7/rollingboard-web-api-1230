import { z } from 'zod';

/////////////////////////////////////////
// COLUMN SCHEMA
/////////////////////////////////////////

export const ColumnSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
  name: z.string(),
  order: z.number().int(),
  projectId: z.string(),
})

export type Column = z.infer<typeof ColumnSchema>

export default ColumnSchema;
