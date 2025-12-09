import '../globals.css';

import { Poppins } from 'next/font/google';

import { Providers } from '@/components/providers';
import { Header } from '@/components/header';

const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

const RootLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<div
		className={`flex min-h-screen flex-col bg-gray-200 ${poppins.className}`}
	>
		<div className="overflow-hidden bg-white xl:min-w-[1200px]">
			<Header />
			<main className="container">
				<Providers>{children}</Providers>
			</main>
		</div>
	</div>
);

export default RootLayout;
