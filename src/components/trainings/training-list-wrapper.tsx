import React from 'react';

import { findTrainingPlansByUserId } from '@/modules/training-plan/server';
import { TrainingList } from '@/components/trainings/training-list';

type TrainingProps = {
	userId: string;
};

const TrainingListWrapper = async ({ userId }: TrainingProps) => {
	const plans = await findTrainingPlansByUserId(userId);

	return <TrainingList plans={plans} />;
};

export default TrainingListWrapper;
