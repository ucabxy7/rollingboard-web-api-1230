import { z } from 'zod';

export const ProjectOrderByRelevanceFieldEnumSchema = z.enum(['id','name','description','createdBy']);

export default ProjectOrderByRelevanceFieldEnumSchema;
