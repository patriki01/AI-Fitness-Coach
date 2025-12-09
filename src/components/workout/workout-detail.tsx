'use client';

import React, { useState, useTransition } from 'react';

import { type Workout, type WorkoutItem } from '@/modules/training-plan/schema';
import { BackToButton } from '@/components/workout/back-to-button';
import { WorkoutHeader } from '@/components/workout/workout-header';
import { WorkoutItemCard } from '@/components/workout/workout-item-card';
import { SaveProgressButton } from '@/components/workout/save-progress-button';
import {
	updateWorkout,
	updateWorkoutItems
} from '@/modules/training-plan/server';

type WorkoutDetailClientProps = {
	initialWorkout: Workout;
	initialItems: WorkoutItem[];
	backTo: "calendar" | "workout";

};

export const WorkoutDetail = ({
	initialWorkout,
	initialItems,
	backTo
}: WorkoutDetailClientProps) => {
	const [workout, setWorkout] = useState<Workout>(initialWorkout);
	const [items, setItems] = useState<WorkoutItem[]>(initialItems);
	const [isPending, startTransition] = useTransition();

	const handleToggleItem = (itemId: string) => {
		setItems(prev =>
			prev.map(item => {
				if (item.id !== itemId) return item;
				const newIsCompleted = !item.isCompleted;
				return {
					...item,
					isCompleted: newIsCompleted,
					dateCompleted: newIsCompleted ? new Date() : null
				};
			})
		);
	};

	const handleSave = () => {
		startTransition(async () => {
			await updateWorkoutItems(items);
			const allItemsCompleted = items.every(item => item.isCompleted);
			const workoutUpdates = {
				isCompleted: allItemsCompleted,
				dateCompleted: allItemsCompleted ? new Date() : null
			};
			await updateWorkout(workout.id, workoutUpdates);
			setWorkout(prev => ({
				...prev,
				...workoutUpdates
			}));
		});
	};

	return (
		<div className="animate-in fade-in space-y-6 duration-500">
			<BackToButton type={backTo} trainingId={workout.trainingPlanId} />
			<WorkoutHeader workout={workout} />

			<div className="grid gap-4">
				{items.map(item => (
					<WorkoutItemCard
						key={item.id}
						item={item}
						handleToggleItem={handleToggleItem}
					/>
				))}
			</div>

			<div className="fixed right-0 bottom-0 left-0 mt-8 border-t border-slate-200 bg-white p-4 md:relative md:border-t-0 md:bg-transparent md:p-0">
				<div className="mx-auto flex max-w-6xl justify-end">
					<SaveProgressButton handleSave={handleSave} isPending={isPending} />
				</div>
			</div>
		</div>
	);
};
