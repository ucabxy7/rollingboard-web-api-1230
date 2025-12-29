import { z } from 'zod';

export const MembershipScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','deletedAt','projectId','userId']);

export default MembershipScalarFieldEnumSchema;
