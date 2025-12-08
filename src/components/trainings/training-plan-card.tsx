'use client';
import React, { useEffect, useState } from 'react';

import { type TrainingPlan, Workout } from '@/modules/training-plan/schema';
import Link from 'next/link';
import { findWorkoutsByTrainingPlanId } from '@/modules/training-plan/server';
import { differenceInCalendarWeeks } from 'date-fns';

type TrainingPlanCardProps = {
	plan: TrainingPlan;
	className?: string;
};

export const TrainingPlanCard: React.FC<TrainingPlanCardProps> = ({
	plan,
	className = ''
}) => {
	const [workouts, setWorkouts] = useState<Workout[]>([]);

	const calculateCurrentWeek = () => {
		const start = new Date(plan.startDate);
		const now = new Date();

		if (now < start) return 0;

		const weekDiff =
			differenceInCalendarWeeks(now, start, { weekStartsOn: 1 }) + 1;
		return Math.min(weekDiff, plan.durationWeeks);
	};

	useEffect(() => {
		findWorkoutsByTrainingPlanId(plan.id).then((value: Workout[]) => {
			setWorkouts(value);
		});
	}, []);
	const currentWeek = calculateCurrentWeek();
	const completed = workouts.filter(value => value.isCompleted);
	const workoutsPerWeek = workouts.length / plan?.durationWeeks!;
	return (
		<div
			className={`relative mb-8 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#5b73e8] to-[#7b52b9] p-6 text-white shadow-lg transition duration-300 hover:from-yellow-400 hover:to-yellow-400 hover:text-black ${className} `}
		>
			<Link className="hover:bg-sky-700" href={`/trainings/${plan.id}`}>
				<h3 className="mb-2 text-2xl font-bold tracking-tight">{plan.name}</h3>

				<div className="mb-4 flex flex-wrap items-center gap-2 text-sm font-medium opacity-90">
					<span>{plan.description ?? 'General Fitness'}</span>
					<span>•</span>
					<span>{plan.durationWeeks} weeks</span>
					<span>•</span>
					<span>{Math.floor(workoutsPerWeek)} days/week</span>
				</div>

				<div className="text-sm font-normal opacity-80">
					Week {currentWeek} of {plan.durationWeeks}: {completed.length} of{' '}
					{workouts.length} workouts completed
				</div>
			</Link>
		</div>
	);
};
