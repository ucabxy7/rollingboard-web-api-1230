import { z } from 'zod';

export const TaskOrderByRelevanceFieldEnumSchema = z.enum(['id','name','description','columnId','assignedToId']);

export default TaskOrderByRelevanceFieldEnumSchema;
