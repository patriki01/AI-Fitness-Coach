'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { signInAction } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginPage: React.FC = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setError(null);
		setIsSubmitting(true);

		const formData = new FormData(event.currentTarget);
		const result = await signInAction(formData);

		if (!result.ok) {
			setError(result.message);
			setIsSubmitting(false);
			return;
		}

		const redirectTo = searchParams.get('redirectTo') ?? '/';
		setIsSubmitting(false);
		router.push(redirectTo);
	};

	const handleGoToSignup = () => {
		const redirectTo = searchParams.get('redirectTo');
		const base = '/auth/signup';
		const url = redirectTo
			? `${base}?redirectTo=${encodeURIComponent(redirectTo)}`
			: base;

		router.push(url);
	};

	return (
		<div className="mx-auto max-w-md">
			<div className="mb-8 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 p-6 text-center text-white shadow-lg">
				<h2 className="text-2xl font-bold">Welcome Back</h2>
				<p className="text-sm opacity-80">
					Log in to continue your fitness journey
				</p>
			</div>

			<div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-[0_5px_25px_rgba(0,0,0,0.15)]">
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="email" className="font-semibold text-gray-700">
							Email
						</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="you@example.com"
							required
							className="rounded-xl border-2 border-gray-200 p-3 focus:border-indigo-400"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="password" className="font-semibold text-gray-700">
							Password
						</Label>
						<Input
							id="password"
							name="password"
							type="password"
							required
							className="rounded-xl border-2 border-gray-200 p-3 focus:border-indigo-400"
						/>
					</div>

					{error && (
						<p className="text-sm font-medium text-red-600" aria-live="polite">
							{error}
						</p>
					)}

					<Button
						type="submit"
						className="w-full rounded-xl bg-gradient-to-br from-indigo-400 to-purple-600 py-6 font-semibold text-white shadow-lg transition hover:opacity-90"
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Logging in...' : 'Log in'}
					</Button>
				</form>

				<p className="mt-4 text-center text-sm text-gray-600">
					Don&apos;t have an account yet?{' '}
					<button
						type="button"
						onClick={handleGoToSignup}
						className="font-semibold text-indigo-600 hover:underline"
					>
						Sign up!
					</button>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
