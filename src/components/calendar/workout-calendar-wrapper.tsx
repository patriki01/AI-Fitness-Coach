import React from 'react';
import { notFound } from 'next/navigation';

import { WorkoutCalendar } from '@/components/calendar/workout-calendar';
import { getLoggedInUserId } from '@/modules/user/server';
import { findWorkoutsByUserId } from '@/modules/training-plan/server';

export const WorkoutCalendarWrapper = async () => {
	const loggerInUserId = await getLoggedInUserId();
	if (!loggerInUserId) {
		notFound();
	}
	const workouts = await findWorkoutsByUserId(loggerInUserId);
	return <WorkoutCalendar initialWorkouts={workouts} />;
};
