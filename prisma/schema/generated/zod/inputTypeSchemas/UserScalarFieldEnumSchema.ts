import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','deletedAt','username','email','cognitoId']);

export default UserScalarFieldEnumSchema;
