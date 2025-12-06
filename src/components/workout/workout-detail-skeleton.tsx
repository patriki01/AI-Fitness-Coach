import React from 'react';

export const WorkoutDetailSkeleton = () => (
	<div className="mx-auto max-w-3xl space-y-4 md:p-4">
		<div className="h-8 w-32 animate-pulse rounded bg-slate-100" />
		<div className="space-y-2">
			<div className="h-14 w-2/3 animate-pulse rounded bg-slate-200" />
			<div className="h-6 w-1/3 animate-pulse rounded bg-slate-100" />
		</div>
		<div className="space-y-4 pt-4">
			{[1, 2, 3].map(i => (
				<div
					key={i}
					className="h-24 w-full animate-pulse rounded-xl border-slate-200 bg-slate-100"
				/>
			))}
		</div>
	</div>
);
