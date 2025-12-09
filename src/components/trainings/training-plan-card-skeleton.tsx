import React from 'react';

export const TrainingPlanCardSkeleton: React.FC = () => (
	<div className="relative mb-8 w-full animate-pulse overflow-hidden rounded-2xl bg-gray-200 p-6 shadow-lg">
		<div className="flex flex-col space-y-3">
			<div className="h-6 w-3/4 rounded bg-gray-300" />

			<div className="flex flex-col space-y-1">
				<div className="h-4 w-1/2 rounded bg-gray-300" />
				<div className="h-4 w-1/3 rounded bg-gray-300" />
				<div className="h-4 w-1/4 rounded bg-gray-300" />
			</div>

			<div className="mt-4 h-4 w-2/5 rounded bg-gray-300" />
		</div>
	</div>
);
