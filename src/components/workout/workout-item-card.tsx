import { CheckSquare, Dumbbell, Square, Timer } from 'lucide-react';
import React from 'react';

import type { WorkoutItem } from '@/modules/training-plan/schema';
import { Card } from '@/components/ui';

type WorkoutItemCardProps = {
	item: WorkoutItem;
	handleToggleItem: (itemId: string) => void;
};

export const WorkoutItemCard = ({
	item,
	handleToggleItem
}: WorkoutItemCardProps) => (
	<Card
		className={`p-4 transition-colors ${item.isCompleted ? 'border-emerald-100 bg-emerald-50/50' : 'bg-white'}`}
	>
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-4">
				<div
					className={`rounded-lg p-3 ${item.isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}
				>
					{item.type === 'volumeBased' ? (
						<Dumbbell className="h-6 w-6" />
					) : (
						<Timer className="h-6 w-6" />
					)}
				</div>

				<div>
					<h3
						className={`text-lg font-semibold ${item.isCompleted ? 'text-emerald-900' : 'text-slate-900'}`}
					>
						{item.name}
					</h3>

					<div className="mt-1 flex items-center gap-3 text-sm font-medium text-slate-500">
						<span>
							{item.sets} {item.sets === 1 ? 'set' : 'sets'}
						</span>
						{item.type === 'volumeBased' && (
							<>
								<span>
									{item.reps} {item.reps === 1 ? 'rep' : 'reps'}
								</span>
								{item.weight !== undefined && <span>{item.weight} kg</span>}
							</>
						)}
						{item.type === 'timeBased' && <span>{item.time} sec</span>}
					</div>
				</div>
			</div>

			<button
				type="button"
				onClick={() => handleToggleItem(item.id)}
				className="flex cursor-pointer items-center justify-center rounded border-none bg-transparent p-0"
				aria-label={
					item.isCompleted ? 'Mark as incomplete' : 'Mark as complete'
				}
				aria-pressed={item.isCompleted}
			>
				{item.isCompleted ? (
					<CheckSquare className="h-8 w-8 text-emerald-500 transition-colors hover:text-emerald-600" />
				) : (
					<Square className="h-8 w-8 text-slate-300 transition-colors hover:text-indigo-500" />
				)}
			</button>
		</div>
	</Card>
);
