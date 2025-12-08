import { type NextRequest, NextResponse } from 'next/server';

const AUTH_ROUTES = ['/auth/login', '/auth/signup'];

const SESSION_COOKIE_NAME = 'better-auth.session_token';

export const middleware = async (request: NextRequest) => {
	const { pathname, searchParams } = request.nextUrl;

	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/favicon.ico') ||
		pathname.startsWith('/api/auth')
	) {
		return NextResponse.next();
	}

	const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
	const isLoggedIn = Boolean(sessionCookie?.value);
	const isAuthRoute = AUTH_ROUTES.includes(pathname);

	if (isLoggedIn && isAuthRoute) {
		const redirectTo = searchParams.get('redirectTo') ?? '/profile';
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
