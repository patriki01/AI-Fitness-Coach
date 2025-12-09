
const UserStatsSkeleton = () => (
	<div className="space-y-10 md:col-span-2">
		<div>
			<h3 className="mb-4 text-xl font-semibold">Your Statistics</h3>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 animate-pulse">
				<StatsBoxSkeleton />
				<StatsBoxSkeleton />
				<StatsBoxSkeleton />
				<StatsBoxSkeleton />
			</div>
		</div>
	</div>
);

const StatsBoxSkeleton = () => (
	<div className="h-24 rounded-lg bg-gray-200">
		<div className="p-4">
			<div className="h-6 w-1/3 bg-gray-300 rounded mb-2"></div>
			<div className="h-8 w-1/4 bg-gray-300 rounded"></div>
		</div>
	</div>
);

export default UserStatsSkeleton;