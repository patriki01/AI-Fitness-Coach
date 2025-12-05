import React from 'react';
import { ChevronRight, Dumbbell } from 'lucide-react';
import {
	eachDayOfInterval,
	endOfWeek,
	format,
	isSameDay,
	isToday,
	parseISO,
	startOfWeek
} from 'date-fns';

import { Badge } from '@/components/common';
import { type Workout } from '@/modules/training-plan/schema';

export const WeekView = ({
	currentDate,
	workouts,
	onWorkoutClick
}: {
	currentDate: Date;
	workouts: Workout[];
	onWorkoutClick: (id: number) => void;
}) => {
	const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
	const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
	const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

	return (
		<div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
			<div className="grid grid-cols-1 divide-y divide-slate-100">
				{days.map(dayItem => {
					const daysWorkouts = workouts.filter(w =>
						isSameDay(parseISO(w.date), dayItem)
					);
					const isTodayDate = isToday(dayItem);

					return (
						<div
							key={dayItem.toISOString()}
							className={`flex min-h-[100px] flex-col p-4 transition-colors hover:bg-slate-50/50 sm:flex-row ${isTodayDate ? 'bg-indigo-50/20' : ''}`}
						>
							{/* Date Column */}
							<div className="mb-3 flex w-full items-center gap-2 sm:mb-0 sm:w-32 sm:flex-col sm:items-start sm:gap-0">
								<span
									className={`text-xs font-bold tracking-wider uppercase ${isTodayDate ? 'text-indigo-600' : 'text-slate-400'}`}
								>
									{format(dayItem, 'EEEE')}
								</span>
								<div className="flex items-baseline gap-1">
									<span
										className={`text-2xl font-light ${isTodayDate ? 'text-indigo-700' : 'text-slate-700'}`}
									>
										{format(dayItem, 'd')}
									</span>
									<span className="hidden text-xs text-slate-400 sm:inline">
										{format(dayItem, 'MMM')}
									</span>
								</div>
							</div>

							{/* Workouts Column */}
							<div className="flex flex-1 flex-col gap-2">
								{daysWorkouts.length === 0 ? (
									<div className="flex h-full items-center">
										<span className="text-sm text-slate-400 italic">
											No workouts scheduled
										</span>
									</div>
								) : (
									daysWorkouts.map(workout => (
										<div
											key={workout.id}
											onClick={() => onWorkoutClick(workout.id)}
											className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-100 bg-white p-3 shadow-sm transition-shadow hover:border-indigo-200 hover:shadow-md"
										>
											<div className="flex items-center gap-3">
												<div
													className={`rounded-full p-2 ${workout.isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}
												>
													<Dumbbell className="h-4 w-4" />
												</div>
												<div>
													<p
														className={`text-sm font-medium ${workout.isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'}`}
													>
														{workout.name}
													</p>
													<div className="mt-1 flex items-center gap-2">
														<Badge
															variant={
																workout.isCompleted ? 'success' : 'secondary'
															}
														>
															{workout.estimatedDurationMin} min
														</Badge>
														{workout.isCompleted && (
															<span className="text-xs font-medium text-emerald-600">
																Completed
															</span>
														)}
													</div>
												</div>
											</div>
											{/* Navigation indicator or action could go here */}
											<ChevronRight className="h-4 w-4 text-slate-300" />
										</div>
									))
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
