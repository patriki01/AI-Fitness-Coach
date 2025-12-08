import { type UseFormSetValue } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { type TrainingPlanFormValues } from '@/app/(app)/trainings/new/page';

const goals = [
	{ label: 'Fat Burning', value: 'fat-burning', icon: '🔥' },
	{ label: 'Muscle Gain', value: 'muscle-gain', icon: '💪' },
	{ label: 'Endurance', value: 'endurance', icon: '⚡' }
];

export const GoalSelector = ({
	selectedGoal,
	setValue
}: {
	selectedGoal: TrainingPlanFormValues['goal'];
	setValue: UseFormSetValue<TrainingPlanFormValues>;
}) => (
	<div>
		<span className="mb-2 block font-semibold text-[#495057]">
			Primary Goal
		</span>
		<div className="grid grid-cols-3 gap-4">
			{goals.map(goal => (
				<button
					type="button"
					key={goal.value}
					id={`goal-${goal.value}`}
					aria-pressed={selectedGoal === goal.value}
					className={cn(
						'flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 p-6 text-center font-semibold transition-all',
						selectedGoal === goal.value
							? 'border-indigo-400 bg-linear-to-br from-indigo-400 to-purple-600 text-white'
							: 'border-[#e9ecef] hover:-translate-y-1 hover:border-indigo-400'
					)}
					onClick={() =>
						setValue('goal', goal.value as TrainingPlanFormValues['goal'])
					}
				>
					<span className="mb-2 text-3xl">{goal.icon}</span>
					{goal.label}
				</button>
			))}
		</div>
	</div>
);
