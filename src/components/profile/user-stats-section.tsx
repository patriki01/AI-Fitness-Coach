import StatsBox from '@/components/trainings/stats-box';
import {
	findWorkoutsByUserId
} from '@/modules/training-plan/server';

const UserStatsSection = async ({ userId }: { userId: string }) => {
	const workouts = await findWorkoutsByUserId(userId);
	const plans = new Set(workouts.filter(w => !w.isCompleted).map(w => w.trainingPlanId));

	const completed = workouts.filter(v => v.isCompleted);
	const estDuration = completed
		.map(value => value.estimatedDurationMin!)
		.reduce((a, b) => a + b);

	const sorted = workouts
		.filter(v => v.date < new Date())
		.sort((a, b) => a.date.getTime() - b.date.getTime());
	const streakArray = sorted.reverse().map(v => (v.isCompleted ? 1 : 0));
	let streak = 0;
	for (let i = 0; i < streakArray.length; i++) {
		if (streakArray[i] == 0) break;
		streak++;
	}

	return (
		<div className="space-y-10 md:col-span-2">
			<div>
				<h3 className="mb-4 text-xl font-semibold">Your Statistics</h3>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<StatsBox text="Workouts Completed" number={completed.length} />
					<StatsBox text="Current Streak" number={streak} />
					<StatsBox text="Total Hours" number={Math.floor(estDuration / 60)} />
					<StatsBox text="Active Plans" number={plans.size} />
				</div>
			</div>
		</div>
	);
};

export default UserStatsSection;
