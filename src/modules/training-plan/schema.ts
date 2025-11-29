import { z } from 'zod';

export const TrainingPlanSchema = z.object({
	id: z.number(),
	name: z.string(),
	description: z.string().optional(),
	isActive: z.boolean(),
	durationWeeks: z.number(),
	startDate: z.string().datetime().optional(),
	endDate: z.string().datetime().optional(),
	userId: z.number()
});
export type TrainingPlan = z.infer<typeof TrainingPlanSchema>;

export const WorkoutSchema = z.object({
	id: z.number(),
	name: z.string(),
	date: z.string().datetime(),
	isCompleted: z.boolean(),
	dateCompleted: z.string().datetime().optional(),
	estimatedDurationMin: z.number().optional(),
	trainingPlanId: z.number(),
	userId: z.number()
});
export type Workout = z.infer<typeof WorkoutSchema>;

export const WorkoutItemSchema = z.object({
	id: z.number(),
	name: z.string(),
	type: z.enum(['volumeBased', 'timeBased']),
	sets: z.number(),
	time: z.number().optional(),
	reps: z.number().optional(),
	weight: z.number().optional(),
	isCompleted: z.boolean(),
	dateCompleted: z.string().datetime().optional(),
	workoutId: z.number()
});
export type WorkoutItem = z.infer<typeof WorkoutItemSchema>;
