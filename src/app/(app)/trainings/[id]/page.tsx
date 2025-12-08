'use client';
import { usePathname } from 'next/navigation';
import {
	findTrainingPlanById,
	findWorkoutsByTrainingPlanId
} from '@/modules/training-plan/server';
import { useEffect, useState } from 'react';
import { TrainingPlan, Workout } from '@/modules/training-plan/schema';
import { WorkoutListItem } from '@/components/trainings/workout-list-item';
import { WeekSeparator } from '@/components/trainings/week-separator';

const Page = () => {
	const path = usePathname();
	const [plan, setPlan] = useState<TrainingPlan>();
	const [workouts, setWorkouts] = useState<Workout[]>([]);

	useEffect(() => {
		const segments = path.split('/');
		const idString = segments[2];
		const planId = parseInt(idString);
		if (isNaN(planId)) {
			throw Error('Invalid planId found in path:' + path);
		}

		findTrainingPlanById(planId)
			.then((value: TrainingPlan | null) => {
				if (value === null) {
					console.log("No such training")
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
	const workoutsPerWeek = workouts.length / plan?.durationWeeks!;
	return (
		<>
			<h2 className="mb-8 text-3xl font-bold">{plan?.name}</h2>
			{workouts.map((workout, index) => {
				const isNewWeek = index % workoutsPerWeek === 0;
				const currentWeek = Math.floor(index / workoutsPerWeek) + 1;
				let separator = null;
				if (isNewWeek) {
					separator = (
						<WeekSeparator
							key={`separator-${index}`}
							label={`Week ${currentWeek}`}
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

export default Page;
