"use client";
import React, { useEffect, useState } from 'react';
import { findTrainingPlansByUserId } from '@/modules/training-plan/server';
import { TrainingPlan } from '@/modules/training-plan/schema';
import { TrainingPlanCard } from '@/components/trainings/training-plan-card';

type TrainingProps = {
	userId: string;
}

const TrainingsWrapper = ({userId}: TrainingProps) =>{
	const [plans, setPlans] = useState<TrainingPlan[]>([]);
	useEffect(() => {
		findTrainingPlansByUserId(userId).then((value) => setPlans(value));
	}, [userId]);

	return (
		<>
			{plans.map((planData) =>
				<TrainingPlanCard
					key={planData.id} plan={planData}
				/>
			)}
		</>
	);
};

export default TrainingsWrapper;