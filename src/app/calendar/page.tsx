import React, { Suspense } from 'react';

import {
	WorkoutCalendarSkeleton,
	WorkoutCalendarWrapper
} from '@/components/calendar';

const TrainingCalendarPage = async () => (
	<div className="min-h-screen bg-white p-4 font-sans text-slate-900 md:p-8">
		<div className="mx-auto max-w-6xl">
			<Suspense fallback={<WorkoutCalendarSkeleton />}>
				<WorkoutCalendarWrapper />
			</Suspense>
		</div>
	</div>
);

export default TrainingCalendarPage;
