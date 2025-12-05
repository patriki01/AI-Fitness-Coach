import {
	eachDayOfInterval,
	endOfMonth,
	endOfWeek,
	isSameDay,
	isSameMonth,
	isToday,
	parseISO,
	startOfMonth,
	startOfWeek
} from 'date-fns';
import React from 'react';

import { type Workout } from '@/modules/training-plan/schema';
import { CalendarDay } from '@/components/calendar/calendar-day';

export const MonthView = ({
	currentDate,
	workouts,
	onWorkoutClick
}: {
	currentDate: Date;
	workouts: Workout[];
	onWorkoutClick: (id: number) => void;
}) => {
	const monthStart = startOfMonth(currentDate);
	const monthEnd = endOfMonth(monthStart);
	const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
	const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

	const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	// Generate all days for the grid
	const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

	return (
		<div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
			{/* Header Row */}
			<div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
				{weekDays.map(d => (
					<div
						key={d}
						className="py-3 text-center text-xs font-semibold tracking-wider text-slate-500 uppercase"
					>
						{d}
					</div>
				))}
			</div>

			{/* Calendar Grid */}
			<div className="grid auto-rows-fr grid-cols-7">
				{calendarDays.map((dayItem, idx) => {
					// Filter workouts for this specific day
					const daysWorkouts = workouts.filter(w =>
						isSameDay(parseISO(w.date), dayItem)
					);

					return (
						<CalendarDay
							key={dayItem.toISOString()}
							date={dayItem}
							workouts={daysWorkouts}
							isCurrentMonth={isSameMonth(dayItem, monthStart)}
							isTodayDate={isToday(dayItem)}
							onWorkoutClick={onWorkoutClick}
						/>
					);
				})}
			</div>
		</div>
	);
};
