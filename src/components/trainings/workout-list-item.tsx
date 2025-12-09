import React from 'react';

import { type Workout } from '@/modules/training-plan/schema';
import ExerciseCount from '@/components/trainings/exercise-count';
import Link from "next/link";

type WorkoutListItemProps = {
	workout: Workout;
};

export const WorkoutListItem: React.FC<WorkoutListItemProps> = ({
	workout
}) => {
	const { name, isCompleted } = workout;
	const statusColor = isCompleted ? 'text-green-600' : 'text-gray-500';
	const borderColor = isCompleted ? 'border-green-500' : 'border-indigo-400';

	return (
		<Link
			className={`flex items-center justify-between rounded-lg border-l-4 bg-white p-4 shadow-sm ${borderColor} my-2 transition-shadow duration-200 hover:shadow-md`}
			href={`/workout/${workout.id}`}
		>
			<div>
				<h3 className="text-lg font-semibold text-gray-800">{name}</h3>
				<ExerciseCount
					key={workout.id}
					workoutId={workout.id}
					duration={workout.estimatedDurationMin!}
					date={workout.date}
				/>
			</div>

			<div className="flex items-center">
				{isCompleted && (
					<svg
						className="mr-1 h-5 w-5 text-green-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 13l4 4L19 7"
						/>
					</svg>
				)}
				<span className={`text-sm font-medium ${statusColor}`}>
					{isCompleted ? 'Completed' : 'Pending'}
				</span>
			</div>
		</Link>
	);
};
