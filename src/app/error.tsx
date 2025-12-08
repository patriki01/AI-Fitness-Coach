'use client';

import { useEffect } from 'react';

const Error = ({
	error,
	reset
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	useEffect(() => {
		console.error(error);
	}, [error]);
	return (
		<div className="flex min-h-[50vh] flex-col items-center justify-center rounded-lg p-6">
			<h2 className="mb-4 text-3xl font-bold text-red-600">
				Something went wrong!
			</h2>
			<p className="mb-6 text-gray-700">
				We encountered an error while loading this section.
			</p>

			{process.env.NODE_ENV === 'development' && (
				<p className="mb-4 text-sm text-gray-500">
					Error details: {error.message}
				</p>
			)}

			<button
				className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600"
				onClick={() => reset()}
			>
				Try again
			</button>
		</div>
	);
};
export default Error;
