import { z } from 'zod';

export const TrainingPlanSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	description: z.string().optional(),
	isActive: z.boolean(),
	durationWeeks: z.number(),
	startDate: z
		.string()
		.datetime()
		.transform(val => new Date(val)),
	endDate: z
		.string()
		.datetime()
		.transform(val => (val ? new Date(val) : undefined))
		.nullish(),
	userId: z.string().uuid()
});
export type TrainingPlan = z.infer<typeof TrainingPlanSchema>;

export const WorkoutSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	date: z
		.string()
		.datetime()
		.transform(val => new Date(val)),
	isCompleted: z.boolean(),
	dateCompleted: z
		.string()
		.datetime()
		.transform(val => (val ? new Date(val) : undefined))
		.nullish(),
	estimatedDurationMin: z.number().optional(),
	trainingPlanId: z.string().uuid(),
	userId: z.string().uuid()
});
export type Workout = z.infer<typeof WorkoutSchema>;

export const WorkoutItemSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	type: z.enum(['volumeBased', 'timeBased']),
	sets: z.number(),
	time: z.number().optional(),
	reps: z.number().optional(),
	isCompleted: z.boolean(),
	dateCompleted: z
		.string()
		.datetime()
		.transform(val => (val ? new Date(val) : undefined))
		.nullish(),
	workoutId: z.string().uuid()
});
export type WorkoutItem = z.infer<typeof WorkoutItemSchema>;
