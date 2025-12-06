'use client';

import * as React from 'react';

import { signUpAction } from '@/app/actions/auth';
import { AuthCard } from '@/components/auth/auth-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SignupPage = () => {
	const formRef = React.useRef<HTMLFormElement | null>(null);
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const formAction = async (formData: FormData) => {
		setError(null);
		setIsSubmitting(true);
		try {
			await signUpAction(formData);
		} catch (e) {
			setError('Failed to sign up. Please try again.');
			setIsSubmitting(false);
		}
	};

	return (
		<AuthCard title="Create account">
			<form ref={formRef} action={formAction} className="space-y-6">
				<div className="space-y-2">
					<Label htmlFor="name">Name</Label>
					<Input
						id="name"
						name="name"
						type="text"
						placeholder="John Doe"
						required
					/>
				</div>

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
					<Input
						id="password"
						name="password"
						type="password"
						required
						minLength={6}
					/>
				</div>

				{error && (
					<p className="text-destructive text-sm" aria-live="polite">
						{error}
					</p>
				)}

				<Button type="submit" className="w-full" disabled={isSubmitting}>
					{isSubmitting ? 'Signing up...' : 'Sign up'}
				</Button>
			</form>
		</AuthCard>
	);
};

export default SignupPage;
