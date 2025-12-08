import type { ReactNode } from 'react';

type AuthLayoutProps = {
	children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => (
	<main className="flex min-h-screen items-center justify-center bg-gray-200">
		<div className="w-full max-w-md rounded-[20px] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
			{children}
		</div>
	</main>
);

export default AuthLayout;
