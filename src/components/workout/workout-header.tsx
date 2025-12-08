import { format } from 'date-fns';
import React from 'react';

import { type Workout } from '@/modules/training-plan/schema';
import { Badge } from '@/components/ui';

type WorkoutHeaderProps = {
	workout: Workout;
};

export const WorkoutHeader = ({ workout }: WorkoutHeaderProps) => (
	<div className="flex flex-col gap-2 border-b border-slate-100 pb-6">
		<div className="flex items-center justify-between">
			<h1 className="text-3xl font-bold text-slate-900">{workout.name}</h1>
			<Badge variant={workout.isCompleted ? 'success' : 'secondary'}>
				{workout.isCompleted ? 'Completed' : 'In Progress'}
			</Badge>
		</div>
		<p className="text-lg text-slate-500">
			{format(new Date(workout.date), 'EEEE, MMMM do, yyyy')}
		</p>
	</div>
);
