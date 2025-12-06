'use server';

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import { auth } from '@/lib/auth';

export const signUpAction = async (formData: FormData) => {
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const name = formData.get('name') as string;

	await auth.api.signUpEmail({
		body: {
			email,
			password,
			name
		}
	});

	redirect('/');
};

export const signInAction = async (formData: FormData) => {
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	await auth.api.signInEmail({
		body: {
			email,
			password
		}
	});

	redirect('/');
};

export const signOutAction = async () => {
	await auth.api.signOut({
		headers: await headers()
	});
	redirect('/');
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
