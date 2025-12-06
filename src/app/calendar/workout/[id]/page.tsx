import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';

import { WorkoutDetailWrapper } from '@/components/workout/workout-detail-wrapper';
import { WorkoutDetailSkeleton } from '@/components/workout/workout-detail-skeleton';

type WorkoutPageProps = {
	params: Promise<{ id: string }>;
};

const WorkoutPage = async ({ params }: WorkoutPageProps) => {
	const { id } = await params;
	const workoutId = parseInt(id);

	if (isNaN(workoutId)) {
		notFound();
	}

	return (
		<div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
			<div className="mx-auto max-w-3xl">
				<Suspense fallback={<WorkoutDetailSkeleton />}>
					<WorkoutDetailWrapper workoutId={workoutId} />
				</Suspense>
			</div>
		</div>
	);
};
export default WorkoutPage;
