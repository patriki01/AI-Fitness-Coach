import { type NextRequest, NextResponse } from 'next/server';

const AUTH_ROUTES = ['/auth/login', '/auth/signup'];

export const middleware = async (request: NextRequest) => {
	const { pathname, searchParams } = request.nextUrl;

	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/favicon.ico') ||
		pathname.startsWith('/api/auth')
	) {
		return NextResponse.next();
	}

	let sessionCookie: unknown;
	try {
		sessionCookie = request.cookies.get('better-auth.session_token');
	} catch (err) {
		console.error('Failed to get session in middleware:', err);
		sessionCookie = null;
	}

	const isLoggedIn = Boolean(sessionCookie);
	const isAuthRoute = AUTH_ROUTES.includes(pathname);

	if (isLoggedIn && isAuthRoute) {
		const redirectTo = searchParams.get('redirectTo') ?? '/calendar';
		return NextResponse.redirect(new URL(redirectTo, request.url));
	}

	if (!isLoggedIn && !isAuthRoute) {
		const loginUrl = new URL('/auth/login', request.url);
		loginUrl.searchParams.set('redirectTo', pathname);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
};

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
