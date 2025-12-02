import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { trainingPlans, workouts } from '@/db/schema/training-plans';

export const users = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name')
});

export const usersRelations = relations(users, ({ many }) => ({
	trainingPlans: many(trainingPlans),
	workouts: many(workouts)
}));
