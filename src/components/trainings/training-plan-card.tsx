import React from 'react';
import { differenceInCalendarWeeks } from 'date-fns';

import { type TrainingPlan } from '@/modules/training-plan/schema';

type TrainingPlanCardProps = {
	plan: TrainingPlan;
	stats: {
		completedWorkouts: number;
		totalWorkoutsInPlan: number;
	};
	className?: string;
};

export const TrainingPlanCard: React.FC<TrainingPlanCardProps> = ({
	plan,
	stats,
	className = ''
}) => {
	const frequencyPerWeek = Math.round(
		stats.totalWorkoutsInPlan / plan.durationWeeks
	);

	const calculateCurrentWeek = () => {
		const start = new Date(plan.startDate);
		const now = new Date();

		if (now < start) return 0;

		const weekDiff =
			differenceInCalendarWeeks(now, start, { weekStartsOn: 1 }) + 1;
		return Math.min(weekDiff, plan.durationWeeks);
	};

	const currentWeek = calculateCurrentWeek();

	return (
		<div
			className={`relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#5b73e8] to-[#7b52b9] p-6 text-white shadow-lg ${className} `}
		>
			<h3 className="mb-2 text-2xl font-bold tracking-tight">{plan.name}</h3>

			<div className="mb-4 flex flex-wrap items-center gap-2 text-sm font-medium opacity-90">
				<span>{plan.description ?? 'General Fitness'}</span>
				<span>•</span>
				<span>{plan.durationWeeks} weeks</span>
				<span>•</span>
				<span>{frequencyPerWeek} days/week</span>
			</div>

			<div className="text-sm font-normal opacity-80">
				Week {currentWeek} of {plan.durationWeeks}: {stats.completedWorkouts}{' '}
				workouts completed
			</div>
		</div>
	);
};
