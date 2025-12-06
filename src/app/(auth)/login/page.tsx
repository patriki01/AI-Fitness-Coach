'use client';

import * as React from 'react';

import { signInAction } from '@/app/actions/auth';
import { AuthCard } from '@/components/auth/auth-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginPage = () => {
	const formRef = React.useRef<HTMLFormElement | null>(null);
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const formAction = async (formData: FormData) => {
		setError(null);
		setIsSubmitting(true);
		try {
			await signInAction(formData);
		} catch (e) {
			setError('Invalid credentials. Please try again.');
			setIsSubmitting(false);
		}
	};

	return (
		<AuthCard title="Log in">
			<form ref={formRef} action={formAction} className="space-y-6">
				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						name="email"
						type="email"
						placeholder="you@example.com"
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="password">Password</Label>
					<Input id="password" name="password" type="password" required />
				</div>

				{error && (
					<p className="text-destructive text-sm" aria-live="polite">
						{error}
					</p>
				)}

				<Button type="submit" className="w-full" disabled={isSubmitting}>
					{isSubmitting ? 'Logging in...' : 'Log in'}
				</Button>
			</form>
		</AuthCard>
	);
};

export default LoginPage;
