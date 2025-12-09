import React, { Suspense } from 'react';

import {
	WorkoutCalendarSkeleton,
	WorkoutCalendarWrapper
} from '@/components/calendar';

const TrainingCalendarPage = async () => (
	<div className="min-h-screen bg-white py-4 font-sans text-slate-900 md:p-8">
		<Suspense fallback={<WorkoutCalendarSkeleton />}>
			<WorkoutCalendarWrapper />
		</Suspense>
	</div>
);

export default TrainingCalendarPage;
