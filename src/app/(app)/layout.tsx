import '../globals.css';

import { Poppins } from 'next/font/google';

import { Providers } from '@/components/providers';
import { Header } from '@/components/header';
import { Navbar } from '@/components/navbar';

const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

const RootLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<html lang="en">
		<body
			className={`flex min-h-screen flex-col bg-gray-200 ${poppins.className}`}
		>
			<div className="mx-auto max-w-[1200px] overflow-hidden rounded-[20px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.3)] xl:min-w-[1200px]">
				<Header />
				<Navbar />
				<main className="container py-10">
					<Providers>{children}</Providers>
				</main>
			</div>
		</body>
	</html>
);

export default RootLayout;
