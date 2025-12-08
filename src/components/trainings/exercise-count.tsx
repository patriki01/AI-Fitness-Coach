"use client";
import React, { useEffect, useState } from 'react';
import {
	findWorkoutItemsByWorkoutId,
} from '@/modules/training-plan/server';
import {WorkoutItem } from '@/modules/training-plan/schema';

type ExerciseProps = {
	workoutId: string;
	duration: number;
}

const ExerciseCount = ({workoutId, duration}: ExerciseProps) => {
	const [items, setItems] =useState<WorkoutItem[]>();

	useEffect(() => {
		findWorkoutItemsByWorkoutId(workoutId).then((items: WorkoutItem[]) => setItems(items))
	}, []);
	return (
		<p className="mt-0.5 text-sm text-gray-500">
			{items?.length} {items?.length === 1 ? "exercise" : "exercises"} &bull; {duration || '--'} min
		</p>
	);
};

export default ExerciseCount;