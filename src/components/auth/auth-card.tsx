'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

export const AuthCard = ({
	title,
	children
}: {
	title: string;
	children: React.ReactNode;
}) => (
	<div className="bg-primary-gradient flex min-h-screen items-center justify-center p-6">
		<Card className="w-full max-w-md rounded-2xl shadow-2xl">
			<CardHeader className="text-center">
				<CardTitle className="bg-primary-gradient bg-clip-text text-2xl font-bold text-transparent">
					{title}
				</CardTitle>
			</CardHeader>

			<CardContent>{children}</CardContent>
		</Card>
	</div>
);
