import { z } from 'zod';

export const ColumnScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','deletedAt','name','order','projectId']);

export default ColumnScalarFieldEnumSchema;
