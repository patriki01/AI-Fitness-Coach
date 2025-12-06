import { notFound } from 'next/navigation';
import React from 'react';

import { WorkoutDetail } from '@/components/workout/workout-detail';
import {
	findWorkoutById,
	findWorkoutItemsByWorkoutId
} from '@/modules/training-plan/server';
import { getLoggedInUserId } from '@/modules/user/server';

type WorkoutDetailWrapperProps = {
	workoutId: number;
};

export const WorkoutDetailWrapper = async ({
	workoutId
}: WorkoutDetailWrapperProps) => {
	const [userId, workout] = await Promise.all([
		getLoggedInUserId(),
		findWorkoutById(workoutId)
	]);

	if (!workout || !userId || workout.userId !== userId) {
		notFound();
	}

	const items = await findWorkoutItemsByWorkoutId(workoutId);

	return <WorkoutDetail initialWorkout={workout} initialItems={items} />;
};
