import { z } from 'zod';

export const ColumnOrderByRelevanceFieldEnumSchema = z.enum(['id','name','projectId']);

export default ColumnOrderByRelevanceFieldEnumSchema;
