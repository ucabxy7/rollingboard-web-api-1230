import { z } from 'zod';

export const MembershipOrderByRelevanceFieldEnumSchema = z.enum(['id','projectId','userId']);

export default MembershipOrderByRelevanceFieldEnumSchema;
