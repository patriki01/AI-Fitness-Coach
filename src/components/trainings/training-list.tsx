import React, { Suspense } from 'react';

import { type TrainingPlan } from '@/modules/training-plan/schema';
import { TrainingPlanCard } from '@/components/trainings/training-plan-card';
import { TrainingPlanCardSkeleton } from '@/components/trainings/training-plan-card-skeleton';

type TrainingsListProps = {
	plans: TrainingPlan[];
};

export const TrainingList = ({ plans }: TrainingsListProps) => {
	if (plans.length === 0) {
		return (
			<div className="rounded-lg border bg-white p-8 text-center">
				<p className="text-lg text-gray-500">
					No training plans found for this user.
				</p>
			</div>
		);
	}

	return (
		<>
			{plans.map(planData => (
				<Suspense key={planData.id} fallback={<TrainingPlanCardSkeleton />}>
					<TrainingPlanCard plan={planData} />
				</Suspense>
			))}
		</>
	);
};
