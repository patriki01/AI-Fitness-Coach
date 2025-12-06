'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { users } from '@/db/schema';
import { type User, UserSchema } from '@/modules/user/schema';

export const getLoggedInUserId = async (): Promise<number | undefined> => {
	// TODO: implement
	const x = 1;
	return x;
};

export const createUser = async (data: Omit<User, 'id'>): Promise<User> => {
	const result = await db
		.insert(users)
		.values({
			name: data.name
		})
		.returning();

	return UserSchema.parse(result[0]);
};

export const findAllUsers = async (): Promise<User[]> => {
	const result = await db.select().from(users);
	return result.map(user => UserSchema.parse(user));
};

export const findUserById = async (id: number): Promise<User | null> => {
	const result = await db.select().from(users).where(eq(users.id, id));

	if (result.length === 0) {
		return null;
	}

	return UserSchema.parse(result[0]);
};

export const updateUserById = async (
	id: number,
	data: Partial<Omit<User, 'id'>>
): Promise<User | null> => {
	const result = await db
		.update(users)
		.set({
			name: data.name
		})
		.where(eq(users.id, id))
		.returning();

	if (result.length === 0) {
		return null;
	}

	return UserSchema.parse(result[0]);
};

export const deleteUserById = async (id: number): Promise<boolean> => {
	const result = await db.delete(users).where(eq(users.id, id)).returning();
	return result.length > 0;
};
