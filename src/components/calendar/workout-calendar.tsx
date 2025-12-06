'use client';

import React, { useState } from 'react';
import { addMonths, addWeeks, subMonths, subWeeks } from 'date-fns';

import { CalendarHeader } from '@/components/calendar/calendar-header';
import { MonthView } from '@/components/calendar/month-view';
import { WeekView } from '@/components/calendar/week-view';
import { type Workout } from '@/modules/training-plan/schema';

type WorkoutCalendarProps = {
	initialWorkouts: Workout[];
};

export const WorkoutCalendar = ({ initialWorkouts }: WorkoutCalendarProps) => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [view, setView] = useState<'month' | 'week'>('month');

	const workouts = initialWorkouts;

	const handleNext = () => {
		if (view === 'month') {
			setCurrentDate(addMonths(currentDate, 1));
		} else {
			setCurrentDate(addWeeks(currentDate, 1));
		}
	};

	const handlePrevious = () => {
		if (view === 'month') {
			setCurrentDate(subMonths(currentDate, 1));
		} else {
			setCurrentDate(subWeeks(currentDate, 1));
		}
	};

	const handleSetToday = () => {
		setCurrentDate(new Date());
	};

	return (
		<div>
			<CalendarHeader
				currentDate={currentDate}
				view={view}
				onViewChange={setView}
				onNext={handleNext}
				onPrevious={handlePrevious}
				setToday={handleSetToday}
			/>

			{view === 'month' ? (
				<MonthView currentDate={currentDate} workouts={workouts} />
			) : (
				<WeekView currentDate={currentDate} workouts={workouts} />
			)}
		</div>
	);
};
