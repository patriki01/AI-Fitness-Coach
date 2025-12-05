import { type Workout } from '@/modules/training-plan/schema';

export const WorkoutItem = ({
	workout,
	onClick
}: {
	workout: Workout;
	onClick: (id: number) => void;
}) => (
	<div
		onClick={e => {
			e.stopPropagation();
			onClick(workout.id);
		}}
		className={`group mb-1 flex cursor-pointer items-center gap-2 rounded-md border p-1.5 text-xs transition-all ${
			workout.isCompleted
				? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
				: 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-sm'
		} `}
	>
		<span
			className={`truncate font-medium ${workout.isCompleted ? 'line-through opacity-70' : ''}`}
		>
			{workout.name}
		</span>
	</div>
);
