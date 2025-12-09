'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

type AuthResult = { ok: true } | { ok: false; message: string };

export const signUpAction = async (formData: FormData): Promise<AuthResult> => {
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const name = formData.get('name') as string;

	try {
		await auth.api.signUpEmail({
			body: { email, password, name }
		});

		return { ok: true };
	} catch (error) {
		const message =
			error instanceof Error
				? error.message
				: 'Failed to sign up. Please try again.';
		return { ok: false, message };
	}
};

export const signInAction = async (formData: FormData): Promise<AuthResult> => {
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	try {
		await auth.api.signInEmail({
			body: { email, password }
		});

		return { ok: true };
	} catch (error) {
		const message =
			error instanceof Error
				? error.message
				: 'Invalid credentials. Please try again.';
		return { ok: false, message };
	}
};

export const signOutAction = async () => {
	await auth.api.signOut({
		headers: await headers()
	});
	redirect('/auth/login');
};

export const getLoggedInUser = async () => {
	const hdrs = await headers();

	const session = await auth.api.getSession({
		headers: hdrs
	});

	if (!session?.user) {
		return null;
	}

	return {
		id: session.user.id,
		email: session.user.email,
		name: session.user.name
	};
};

export const getLoggedInUserId = async () => {
	const hdrs = await headers();

	const session = await auth.api.getSession({
		headers: hdrs
	});

	if (!session?.user) {
		return null;
	}

	return session.user.id;
};
