'use client';
import React, { useEffect, useState } from 'react';

import {
	type TrainingPlan,
	type Workout
} from '@/modules/training-plan/schema';
import {
	findTrainingPlanById,
	findWorkoutsByTrainingPlanId
} from '@/modules/training-plan/server';
import { WeekSeparator } from '@/components/trainings/week-separator';
import { WorkoutListItem } from '@/components/trainings/workout-list-item';
import { calculateFrequency } from '@/components/trainings/training-plan-card';
import { TrainingPageSkeleton } from '@/components/trainings/training-page-skeleton';

type TrainingPlanProps = {
	planId: string;
};

const TrainingPageWrapper = ({ planId }: TrainingPlanProps) => {
	const [plan, setPlan] = useState<TrainingPlan>();
	const [workouts, setWorkouts] = useState<Workout[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		Promise.all([
			findTrainingPlanById(planId),
			findWorkoutsByTrainingPlanId(planId)
		])
			.then(([planValue, workoutsValue]) => {
				if (planValue === null) {
					throw new Error('No such training plan found');
				}
				setPlan(planValue);
				setWorkouts(workoutsValue || []);
			})
			.catch(error => {
				console.error('Error fetching plan data:', error);
				throw new Error(error.message ?? 'Failed to load plan details.');
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [planId]);

	if (isLoading) {
		return <TrainingPageSkeleton />;
	}

	return (
		<>
			<h2 className="mb-8 text-3xl font-bold">{plan?.name}</h2>
			<p>{plan?.description}</p>
			{workouts.map((workout, index) => {
				const workoutsPerWeek = calculateFrequency(workouts);
				let separator = null;
				if (index % workoutsPerWeek === 0) {
					separator = (
						<WeekSeparator
							key={`separator-${index}`}
							label={`Week ${Math.floor(index / workoutsPerWeek) + 1}`}
						/>
					);
				}
				return (
					<div key={`workout-${workout.id}`}>
						{separator}
						<WorkoutListItem key={workout.id} workout={workout} />
					</div>
				);
			})}
		</>
	);
};

export default TrainingPageWrapper;
