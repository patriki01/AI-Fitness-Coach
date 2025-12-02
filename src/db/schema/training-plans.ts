import {
	sqliteTable,
	text,
	integer,
	real,
	index
} from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { users } from '@/db/schema/users';

export const trainingPlans = sqliteTable(
	'training_plans',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		name: text('name').notNull(),
		description: text('description'),
		isActive: integer('is_active', { mode: 'boolean' }).notNull(),
		durationWeeks: integer('duration_weeks').notNull(),
		startDate: integer('start_date', { mode: 'timestamp' }).notNull(),
		endDate: integer('end_date', { mode: 'timestamp' }),
		userId: integer('user_id').notNull()
	},
	table => ({
		userIdIdx: index('training_plans_user_id_idx').on(table.userId)
	})
);

export const trainingPlansRelations = relations(
	trainingPlans,
	({ many, one }) => ({
		workouts: many(workouts),
		user: one(users, {
			fields: [trainingPlans.userId],
			references: [users.id]
		})
	})
);

export const workouts = sqliteTable(
	'workouts',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		name: text('name').notNull(),
		date: text('date').notNull(),
		isCompleted: integer('is_completed', { mode: 'boolean' }).notNull(),
		dateCompleted: integer('date_completed', { mode: 'timestamp' }),
		estimatedDurationMin: integer('estimated_duration_min'),
		trainingPlanId: integer('training_plan_id')
			.notNull()
			.references(() => trainingPlans.id, { onDelete: 'cascade' }),

		userId: integer('user_id').notNull()
	},
	table => ({
		trainingPlanIdx: index('workouts_training_plan_idx').on(
			table.trainingPlanId
		),
		userIdIdx: index('workouts_user_id_idx').on(table.userId)
	})
);

export const workoutsRelations = relations(workouts, ({ one, many }) => ({
	trainingPlan: one(trainingPlans, {
		fields: [workouts.trainingPlanId],
		references: [trainingPlans.id]
	}),
	items: many(workoutItems),
	user: one(users, {
		fields: [workouts.userId],
		references: [users.id]
	})
}));

export const workoutItems = sqliteTable(
	'workout_items',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		name: text('name').notNull(),
		type: text('type').notNull(), // 'volumeBased' | 'timeBased'
		sets: integer('sets').notNull(),
		time: real('time'),
		reps: integer('reps'),
		weight: real('weight'),
		isCompleted: integer('is_completed', { mode: 'boolean' }).notNull(),
		dateCompleted: integer('date_completed', { mode: 'timestamp' }),
		workoutId: integer('workout_id')
			.notNull()
			.references(() => workouts.id, { onDelete: 'cascade' })
	},
	table => ({
		workoutIdx: index('workout_items_workout_idx').on(table.workoutId)
	})
);

export const workoutItemsRelations = relations(workoutItems, ({ one }) => ({
	workout: one(workouts, {
		fields: [workoutItems.workoutId],
		references: [workouts.id]
	})
}));
