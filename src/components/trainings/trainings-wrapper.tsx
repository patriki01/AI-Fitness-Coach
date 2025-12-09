"use client";
import React, { useEffect, useState } from 'react';
import { findTrainingPlansByUserId } from '@/modules/training-plan/server';
import { TrainingPlan } from '@/modules/training-plan/schema';
import { TrainingPlanCard } from '@/components/trainings/training-plan-card';
import { TrainingPlanCardSkeleton } from '@/components/trainings/training-plan-card-skeleton';

type TrainingProps = {
	userId: string;
}

const TrainingsWrapper = ({userId}: TrainingProps) =>{
	const [plans, setPlans] = useState<TrainingPlan[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		setIsLoading(true);

		findTrainingPlansByUserId(userId)
			.then((value) => {
				setPlans(value);
			})
			.catch((error) => {
				console.error("Failed to fetch plans:", error);
				setPlans([]);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [userId]);

	if (isLoading) {
			return Array(3).fill(0).map((_, index) => (
				<TrainingPlanCardSkeleton key={index + 123} />
			));
	}

	if (plans.length === 0 && !isLoading) {
		return (
			<div className="text-center p-8 border rounded-lg bg-white">
				<p className="text-lg text-gray-500">No training plans found for this user.</p>
			</div>
		);
	}
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