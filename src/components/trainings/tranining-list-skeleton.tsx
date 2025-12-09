import React from 'react';

import { TrainingPlanCardSkeleton } from '@/components/trainings/training-plan-card-skeleton';

export const TrainingListSkeleton = () => (
	<>
		{Array(3)
			.fill(0)
			.map((_, index) => (
				<TrainingPlanCardSkeleton key={index} />
			))}
	</>
);
