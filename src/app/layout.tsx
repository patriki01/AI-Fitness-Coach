import './globals.css';
import type { ReactNode } from 'react';

type RootLayoutProps = {
	children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
	<html lang="en">
		<body className="bg-background text-foreground min-h-screen font-sans">
			{children}
		</body>
	</html>
);

export default RootLayout;
