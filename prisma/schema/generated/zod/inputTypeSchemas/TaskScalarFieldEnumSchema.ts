import { z } from 'zod';

export const TaskScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','deletedAt','name','description','position','columnId','assignedToId']);

export default TaskScalarFieldEnumSchema;
