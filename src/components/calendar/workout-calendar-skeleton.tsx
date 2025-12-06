import React from 'react';

export const WorkoutCalendarSkeleton = () => (
	<div className="flex animate-pulse flex-col gap-6">
		<div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
			<div className="flex items-center gap-2">
				<div className="h-10 w-10 rounded-lg bg-slate-200" />
				<div className="h-8 w-48 rounded bg-slate-200" />
			</div>
			<div className="flex gap-2">
				<div className="h-10 w-24 rounded bg-slate-200" />
				<div className="h-10 w-32 rounded bg-slate-200" />
			</div>
		</div>

		<div className="flex h-96 w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
			<div className="flex flex-col items-center gap-2 text-slate-400">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
				<span className="text-sm">Loading schedule...</span>
			</div>
		</div>
	</div>
);
