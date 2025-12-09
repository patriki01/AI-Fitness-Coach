import Link from 'next/link';
import { headers } from 'next/headers';
import React from 'react';

import { auth } from '@/lib/auth';
import TrainingsWrapper from '@/components/trainings/trainings-wrapper';

const Page = async () => {
	const session = await auth.api.getSession({
		headers: await headers()
	});
	const userId = session?.user?.id;

	return (
		<>
			<div className="mb-6 flex items-center justify-between bg-white p-4 md:p-8">
				<h1 className="text-3xl font-bold text-gray-900">My Training Plans</h1>
				<Link href="/trainings/new" passHref>
					<div className="inline-flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-[#7b52b9] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#6a46a5]">
						+New Plan
					</div>
				</Link>
			</div>
			<TrainingsWrapper userId={userId!} />
		</>
	);
};

export default Page;
