import { z } from 'zod';

export const ProjectScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','deletedAt','name','description','createdBy']);

export default ProjectScalarFieldEnumSchema;
