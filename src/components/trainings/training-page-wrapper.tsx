"use client";
import React, { useEffect, useState } from 'react';
import { TrainingPlan, Workout } from '@/modules/training-plan/schema';
import {
	findTrainingPlanById,
	findWorkoutsByTrainingPlanId
} from '@/modules/training-plan/server';
import { WeekSeparator } from '@/components/trainings/week-separator';
import { WorkoutListItem } from '@/components/trainings/workout-list-item';
import { differenceInCalendarDays } from 'date-fns';
import { calculateFrequency } from '@/components/trainings/training-plan-card';

type TrainingPlanProps = {
	planId: string;
}

const TrainingPageWrapper = ({ planId }: TrainingPlanProps) => {
	const [plan, setPlan] = useState<TrainingPlan>();
	const [workouts, setWorkouts] = useState<Workout[]>([]);

	useEffect(() => {

		findTrainingPlanById(planId)
			.then((value: TrainingPlan | null) => {
				if (value === null) {
					console.log('No such training');
					throw Error('No such training');
				}
				setPlan(value);
				console.log(value);
			})
			.catch(error => {
				throw Error(error);
			});

		findWorkoutsByTrainingPlanId(planId).then((value: Workout[]) => {
			setWorkouts(value);
		});
	}, []);


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