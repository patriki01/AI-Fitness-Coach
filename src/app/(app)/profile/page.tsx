import { Button } from '@/components/ui';
import { getLoggedInUser, signOutAction } from '@/app/actions/auth';
import { Suspense } from 'react';
import UserStatsSkeleton from '@/components/profile/user-stats-skeleton';
import UserStatsSection from '@/components/profile/user-stats-section';

const ProfilePage = async () => {
	const user = await getLoggedInUser();

	if (!user) {
		return (
			<div className="text-center text-xl font-semibold text-gray-600">
				You must be signed in to view your profile.
			</div>
		);
	}

	return (
		<div className="space-y-10">
			<h2 className="mb-6 text-2xl font-bold">Profile & Statistics</h2>

			<div className="grid grid-cols-1 gap-10 md:grid-cols-3">
				<div className="md:col-span-1">
					<div className="rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 p-8 text-center text-white">
						<div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-white text-5xl text-indigo-500">
							👤
						</div>
						<h3 className="text-2xl font-semibold">{user.name}</h3>
						<p className="opacity-90">{user.email}</p>

						<form action={signOutAction}>
							<Button
								type="submit"
								className="mt-6 w-full bg-white/20 text-white hover:bg-white/30"
							>
								Sign Out
							</Button>
						</form>
					</div>
				</div>

				<Suspense fallback={<UserStatsSkeleton />}>
					<UserStatsSection userId={user.id} />
				</Suspense>
			</div>
		</div>
	);
};

export default ProfilePage;
