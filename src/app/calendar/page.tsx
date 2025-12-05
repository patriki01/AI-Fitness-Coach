'use client';

import React, { useEffect, useState } from 'react';
import { addMonths, addWeeks, subMonths, subWeeks } from 'date-fns';

import { CalendarHeader } from '@/components/calendar/calendar-header';
import { MonthView } from '@/components/calendar/month-view';
import { WeekView } from '@/components/calendar/week-view';
import { findWorkoutsByUserId } from '@/modules/training-plan/server';
import { type Workout } from '@/modules/training-plan/schema';

const TrainingCalendarPage = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [view, setView] = useState<'month' | 'week'>('month');
	const [workouts, setWorkouts] = useState<Workout[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// Initial Data Fetch (Simulating useQuery)
	useEffect(() => {
		setIsLoading(true);
		findWorkoutsByUserId(1).then(data => {
			setWorkouts(data);
			setIsLoading(false);
		});
	}, []);

	// Navigation Logic
	const handleNext = () => {
		if (view === 'month') {
			setCurrentDate(addMonths(currentDate, 1));
		} else {
			setCurrentDate(addWeeks(currentDate, 1));
		}
	};

	const handlePrev = () => {
		if (view === 'month') {
			setCurrentDate(subMonths(currentDate, 1));
		} else {
			setCurrentDate(subWeeks(currentDate, 1));
		}
	};

	const handleToday = () => {
		setCurrentDate(new Date());
	};

	// Mock Navigation
	const handleWorkoutClick = (id: number) => {
		console.log(`Navigating to workout ${id}...`);
		// router.push(`/workouts/${id}`);
	};

	return (
		<div className="min-h-screen bg-white p-4 font-sans text-slate-900 md:p-8">
			<div className="mx-auto max-w-6xl">
				{/* Header */}
				<CalendarHeader
					currentDate={currentDate}
					view={view}
					onViewChange={setView}
					onNext={handleNext}
					onPrev={handlePrev}
					onToday={handleToday}
				/>

				{/* Content Area */}
				{isLoading ? (
					<div className="flex h-96 flex-col items-center justify-center text-slate-400">
						<div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
						Loading training schedule...
					</div>
				) : (
					<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
						{view === 'month' ? (
							<MonthView
								currentDate={currentDate}
								workouts={workouts}
								onWorkoutClick={handleWorkoutClick}
							/>
						) : (
							<WeekView
								currentDate={currentDate}
								workouts={workouts}
								onWorkoutClick={handleWorkoutClick}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default TrainingCalendarPage;
