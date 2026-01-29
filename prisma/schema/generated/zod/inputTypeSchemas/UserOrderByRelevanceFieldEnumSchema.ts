import { z } from 'zod';

export const UserOrderByRelevanceFieldEnumSchema = z.enum(['id','username','email','cognitoId']);

export default UserOrderByRelevanceFieldEnumSchema;
