'use client';

import { useEffect } from 'react';

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 rounded-lg">
            <h2 className="text-3xl font-bold text-red-600 mb-4">
                Something went wrong!
            </h2>
            <p className="text-gray-700 mb-6">
                We encountered an error while loading this section.
            </p>

            {process.env.NODE_ENV === 'development' && (
                <p className="text-sm text-gray-500 mb-4">
                    Error details: {error.message}
                </p>
            )}

            <button
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                onClick={
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    );
}