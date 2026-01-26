import { z } from 'zod';

export const UserOrderByRelevanceFieldEnumSchema = z.enum(['id','username','email','cognitoId','avater']);

export default UserOrderByRelevanceFieldEnumSchema;
