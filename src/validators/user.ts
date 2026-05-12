import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  bio: z.string().max(500).optional(),
  relationshipStatus: z
    .enum(['single', 'in_relationship', 'complicated', 'engaged', 'married'])
    .optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
