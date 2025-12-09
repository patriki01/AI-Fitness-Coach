import Link from 'next/link';
import { differenceInCalendarDays, differenceInCalendarWeeks } from 'date-fns';

import {
	type TrainingPlan,
	type Workout
} from '@/modules/training-plan/schema';
import { findWorkoutsByTrainingPlanId } from '@/modules/training-plan/server';

type TrainingPlanCardProps = {
	plan: TrainingPlan;
};

export const TrainingPlanCard = async ({ plan }: TrainingPlanCardProps) => {
	const workouts = await findWorkoutsByTrainingPlanId(plan.id);

	const calculateCurrentWeek = () => {
		const start = new Date(plan.startDate);
		const now = new Date();

		if (now < start) return 0;

		const weekDiff =
			differenceInCalendarWeeks(now, start, { weekStartsOn: 1 }) + 1;
		return Math.min(weekDiff, plan.durationWeeks);
	};

	const currentWeek = calculateCurrentWeek();
	const completed = workouts.filter(value => value.isCompleted);
	const workoutsPerWeek = calculateFrequency(workouts);

	return (
		<div className="relative mb-8 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#5b73e8] to-[#7b52b9] p-6 text-white shadow-lg transition duration-300 hover:from-yellow-400 hover:to-yellow-400 hover:text-black">
			<Link className="hover:bg-sky-700" href={`/trainings/${plan.id}`}>
				<h3 className="mb-2 text-2xl font-bold tracking-tight">{plan.name}</h3>

				<div className="mb-2 flex flex-wrap items-center gap-2 text-sm font-medium opacity-90">
					<span>• {plan.description ?? 'General Fitness'}</span>
				</div>
				<div className="mb-2 flex flex-wrap items-center gap-2 text-sm font-medium opacity-90">
					<span>• {plan.durationWeeks} weeks</span>
				</div>
				<div className="mb-2 flex flex-wrap items-center gap-2 text-sm font-medium opacity-90">
					<span>• {workoutsPerWeek} days/week</span>
				</div>

				<div className="text-sm font-normal opacity-80">
					Week {currentWeek} of {plan.durationWeeks}: {completed.length} of{' '}
					{workouts.length} workouts completed
				</div>
			</Link>
		</div>
	);
};

export const calculateFrequency = (ws: Workout[]) => {
	if (!ws || ws.length === 0) return 0;
	const checkLimit = Math.min(ws.length, 7);

	let frequency = 0;
	for (let i = 0; i < checkLimit; i++) {
		if (differenceInCalendarDays(ws[i].date, ws[0].date) <= 6) {
			frequency++;
		}
	}

	return frequency;
};
