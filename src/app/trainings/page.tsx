import Link from 'next/link';

import { TrainingPlanCard } from '@/components/trainings/training-plan-card';
import {
	type TrainingPlan,
	type Workout,
	type WorkoutItem
} from '@/modules/training-plan/schema';
import { WorkoutItemTile } from '@/components/trainings/workout-item-tile';
import { WeekSeparator } from '@/components/trainings/week-separator';
import { WorkoutListItem } from '@/components/trainings/workout-list-item';

const Page = () => {
	const mockedPlan: TrainingPlan = {
		id: 1,
		name: 'Summer Shred 2024',
		description: 'Fat Burning',
		isActive: true,
		durationWeeks: 8,
		startDate: new Date(),
		endDate: new Date(2026),
		userId: 1
	};
	const sampleWorkoutSummary: Workout = {
		id: 102,
		name: 'Day 2 - Lower Body HIIT',
		date: new Date(Date.now() + 86400000).toISOString(),
		isCompleted: false,
		dateCompleted: undefined,
		estimatedDurationMin: 30,
		trainingPlanId: 1,
		userId: 1
	};

	const sampleUpperBodyWorkout: WorkoutItem[] = [
		{
			id: 1,
			workoutId: 101, // Assuming this maps to the 'Day 1' workout ID
			name: 'Barbell Bench Press',
			type: 'volumeBased',
			sets: 3,
			reps: 8,
			weight: 135, // lbs or kg
			time: undefined,
			isCompleted: true, // Start pending
			dateCompleted: undefined
		},

		// 2. Volume-Based: Pull-ups (Bodyweight)
		{
			id: 2,
			workoutId: 101,
			name: 'Assisted Pull-ups',
			type: 'volumeBased',
			sets: 3,
			reps: 10,
			weight: 0, // Use 0 for bodyweight exercises unless adding external weight
			time: undefined,
			isCompleted: false,
			dateCompleted: undefined
		},

		// 3. Volume-Based: Dumbbell Shoulder Press
		{
			id: 3,
			workoutId: 101,
			name: 'Dumbbell Overhead Press',
			type: 'volumeBased',
			sets: 3,
			reps: 12,
			weight: 35,
			time: undefined,
			isCompleted: false,
			dateCompleted: undefined
		},

		// 4. Volume-Based: Cable Rows
		{
			id: 4,
			workoutId: 101,
			name: 'Seated Cable Rows',
			type: 'volumeBased',
			sets: 3,
			reps: 10,
			weight: 90,
			time: undefined,
			isCompleted: false,
			dateCompleted: undefined
		}
	];

	return (
		<>
			<div className="mb-6 flex items-center justify-between">
				<h1 className="text-3xl font-bold text-gray-900">My Training Plans</h1>
				<Link href="/trainings/new" passHref>
					<div className="inline-flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-[#7b52b9] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#6a46a5]">
						+New Plan
					</div>
				</Link>
			</div>
			<TrainingPlanCard
				plan={mockedPlan}
				stats={{
					completedWorkouts: 1,
					totalWorkoutsInPlan: 8
				}}
			/>
			<WeekSeparator label="Week 1" />
			<WorkoutListItem
				workout={sampleWorkoutSummary}
				stats={{
					exerciseCount: 6
				}}
			/>
		</>
	);
};

export default Page;
