import { format } from 'date-fns';

import { type Workout } from '@/modules/training-plan/schema';
import { WorkoutItem } from '@/components/calendar/workout-item';

export const CalendarDay = ({
	date,
	workouts,
	isCurrentMonth,
	isTodayDate
}: {
	date: Date;
	workouts: Workout[];
	isCurrentMonth: boolean;
	isTodayDate: boolean;
}) => (
	<div
		className={`flex min-h-[120px] flex-col gap-2 border-r border-b border-slate-100 p-2 transition-colors ${!isCurrentMonth ? 'bg-slate-50/50' : 'bg-white'} ${isTodayDate ? 'bg-indigo-50/30' : ''} `}
	>
		<div className="flex items-start justify-between">
			<span
				className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium ${isTodayDate ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500'} ${!isCurrentMonth ? 'opacity-40' : ''} `}
			>
				{format(date, 'd')}
			</span>
			{workouts.length > 0 && (
				<span className="text-[10px] font-medium text-slate-400">
					{workouts.length} {workouts.length === 1 ? 'item' : 'items'}
				</span>
			)}
		</div>

		<div className="mt-1 flex max-h-48 flex-col gap-1 overflow-x-auto">
			{workouts.map(workout => (
				<WorkoutItem key={workout.id} workout={workout} />
			))}
		</div>
	</div>
);
