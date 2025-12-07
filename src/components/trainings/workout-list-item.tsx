import React from 'react';

import { type Workout } from '@/modules/training-plan/schema';

type WorkoutListItemProps = {
	workout: Workout;
	stats: {
		exerciseCount: number;
		// You could also add actualDurationMin here if calculated
	};
	/** Optional click handler for when the user interacts with the workout item */
	onClick?: () => void;
};

export const WorkoutListItem: React.FC<WorkoutListItemProps> = ({
	workout,
	stats,
	onClick
}) => {
	const { name, isCompleted, estimatedDurationMin } = workout;
	const { exerciseCount } = stats;

	// Determine the styling for the completion status and the left border
	const statusText = isCompleted ? 'Completed' : 'Pending';
	const statusColor = isCompleted ? 'text-green-600' : 'text-gray-500';
	const borderColor = isCompleted ? 'border-green-500' : 'border-indigo-400';
	const cursorStyle = onClick ? 'cursor-pointer hover:bg-gray-50' : '';

	return (
		<div
			className={`flex items-center justify-between rounded-lg border-l-4 bg-white p-4 shadow-sm ${borderColor} transition-shadow duration-200 hover:shadow-md ${cursorStyle} `}
			role={onClick ? 'button' : undefined}
		>
			{/* Left Section: Name and Details */}
			<div>
				<h3 className="text-lg font-semibold text-gray-800">{name}</h3>
				<p className="mt-0.5 text-sm text-gray-500">
					{exerciseCount} exercises &bull; {estimatedDurationMin || '--'} min
				</p>
			</div>

			{/* Right Section: Status */}
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
					{statusText}
				</span>
			</div>
		</div>
	);
};
