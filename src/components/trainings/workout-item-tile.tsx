import React from 'react';

import { type WorkoutItem } from '@/modules/training-plan/schema';

type WorkoutItemTileProps = {
	item: WorkoutItem;
};

export const WorkoutItemTile: React.FC<WorkoutItemTileProps> = ({ item }) => {
	const { name, type, sets, time, reps, weight, isCompleted } = item;

	const renderDetails = () => {
		if (type === 'volumeBased') {
			const weightText = weight ? `@ ${weight} kg` : '(Bodyweight)';
			return `${sets} sets x ${reps} reps ${weightText}`;
		}

		if (type === 'timeBased') {
			const timeUnit =
				time && time >= 60 ? `(${(time / 60).toFixed(0)} min)` : '';
			return `${sets} sets x ${time} seconds ${timeUnit}`;
		}

		return 'Details unavailable';
	};

	const checkmarkColor = isCompleted ? 'text-green-500' : 'text-gray-300';
	const nameStyle = isCompleted
		? 'line-through text-gray-500'
		: 'text-gray-800';

	return (
		<div className="flex items-center justify-between border-b border-gray-100 p-3 transition-colors last:border-b-0 hover:bg-gray-50">
			<div className="flex flex-col">
				<span className={`text-base font-medium ${nameStyle}`}>{name}</span>
				<span className="mt-0.5 text-sm text-gray-500">{renderDetails()}</span>
			</div>

			<div className="flex items-center">
				<svg
					className={`h-6 w-6 ${checkmarkColor}`}
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
			</div>
		</div>
	);
};
