import { notFound } from 'next/navigation';
import React from 'react';

import { WorkoutDetail } from '@/components/workout/workout-detail';
import {
	findWorkoutById,
	findWorkoutItemsByWorkoutId
} from '@/modules/training-plan/server';
import { getLoggedInUserId } from '@/app/actions/auth';

type WorkoutDetailWrapperProps = {
	workoutId: string;
	backTo: "calendar" | "workout";
};

export const WorkoutDetailWrapper = async ({
	workoutId,
	backTo
}: WorkoutDetailWrapperProps) => {
	const [userId, workout] = await Promise.all([
		getLoggedInUserId(),
		findWorkoutById(workoutId)
	]);

	if (!workout || !userId || workout.userId !== userId) {
		notFound();
	}

	const items = await findWorkoutItemsByWorkoutId(workoutId);

	return (
		<WorkoutDetail
			initialWorkout={workout}
			initialItems={items}
			backTo={backTo}
		/>
	);
};
