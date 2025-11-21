import { z } from 'zod';

export const UserSchema = z.object({
	id: z.string(),
	name: z.string()
	// TODO: to be added after the seminar for Auth
});
export type User = z.infer<typeof UserSchema>;
