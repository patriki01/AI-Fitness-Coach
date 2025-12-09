import React from 'react';

const WorkoutListItemSkeleton = () => (
	<div className="mb-4 h-16 w-full animate-pulse rounded-lg bg-gray-200">
		<div className="flex items-center justify-between p-4">
			<div className="h-4 w-1/3 rounded bg-gray-300"></div>
			<div className="h-4 w-1/6 rounded bg-gray-300"></div>
		</div>
	</div>
);

export const TrainingPageSkeleton: React.FC = () => {
	return (
		<div className="p-4">
			<div className="mb-8 h-8 w-2/3 animate-pulse rounded bg-gray-300"></div>

			<div className="mb-8 h-4 w-full animate-pulse rounded bg-gray-200"></div>

			<h3 className="mb-4 text-xl font-semibold text-gray-700">
				Workouts Loading:
			</h3>

			{Array(5)
				.fill(0)
				.map((_, index) => (
					<React.Fragment key={index}>
						{index % 5 === 0 && (
							<div className="my-6 h-5 w-1/4 animate-pulse rounded-full bg-gray-400"></div>
						)}
						<WorkoutListItemSkeleton />
					</React.Fragment>
				))}
		</div>
	);
};
