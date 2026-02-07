import { z } from 'zod';

/////////////////////////////////////////
// TASK SCHEMA
/////////////////////////////////////////

export const TaskSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
  name: z.string(),
  description: z.string(),
  position: z.number().int(),
  columnId: z.string(),
  assignedToId: z.string().nullable(),
})

export type Task = z.infer<typeof TaskSchema>

export default TaskSchema;
