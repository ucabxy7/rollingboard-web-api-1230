import { z } from 'zod';

/////////////////////////////////////////
// PROJECT SCHEMA
/////////////////////////////////////////

export const ProjectSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
  name: z.string(),
  description: z.string(),
  createdBy: z.string(),
})

export type Project = z.infer<typeof ProjectSchema>

export default ProjectSchema;
