import { Button } from '@/components/ui/button';
import { getLoggedInUser, signOutAction } from '@/app/actions/auth';

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

				<div className="space-y-10 md:col-span-2">
					<div>
						<h3 className="mb-4 text-xl font-semibold">Your Statistics</h3>
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
							<div className="rounded-2xl bg-gray-100 p-8 text-center shadow">
								<div className="text-4xl font-bold text-indigo-500">24</div>
								<div className="font-semibold text-gray-600">
									Workouts Completed
								</div>
							</div>
							<div className="rounded-2xl bg-gray-100 p-8 text-center shadow">
								<div className="text-4xl font-bold text-indigo-500">8</div>
								<div className="font-semibold text-gray-600">
									Current Streak
								</div>
							</div>
							<div className="rounded-2xl bg-gray-100 p-8 text-center shadow">
								<div className="text-4xl font-bold text-indigo-500">156</div>
								<div className="font-semibold text-gray-600">Total Hours</div>
							</div>
							<div className="rounded-2xl bg-gray-100 p-8 text-center shadow">
								<div className="text-4xl font-bold text-indigo-500">3</div>
								<div className="font-semibold text-gray-600">Active Plans</div>
							</div>
						</div>
					</div>

					<div className="rounded-2xl bg-gray-100 p-8 shadow">
						<h3 className="mb-4 text-xl font-semibold">Settings</h3>

						<div className="space-y-6">
							<div className="space-y-2">
								<label
									htmlFor="measurement-system"
									className="font-semibold text-gray-700"
								>
									Measurement System
								</label>
								<select
									id="measurement-system"
									className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 transition outline-none focus:border-indigo-500 focus:ring-indigo-200"
								>
									<option>Metric (kg, cm)</option>
									<option>Imperial (lbs, inches)</option>
								</select>
							</div>

							<Button className="bg-gradient-to-br from-indigo-400 to-purple-600 text-white">
								Save Settings
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
