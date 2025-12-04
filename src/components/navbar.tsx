'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
	{
		label: 'Calendar',
		icon: '📅',
		href: '/calendar',
		match: (p: string) => p === '/' || p.startsWith('/calendar')
	},
	{
		label: 'Profile',
		icon: '👤',
		href: '/profile',
		match: (p: string) => p.startsWith('/profile')
	},
	{
		label: 'Create Plan',
		icon: '➕',
		href: '/trainings/new',
		match: (p: string) => p === '/trainings/new'
	},
	{
		label: 'My Plans',
		icon: '📋',
		href: '/trainings',
		match: (p: string) => p.startsWith('/trainings') && p !== '/trainings/new'
	}
];

export const Navbar = () => {
	const pathname = usePathname();

	return (
		<nav className="border-b-2 border-[#e9ecef] bg-[#f8f9fa]">
			<ul className="flex">
				{navItems.map(item => {
					const active = item.match?.(pathname);

					return (
						<li key={item.label} className="flex-1">
							<Link
								href={item.href}
								className={`relative flex w-full cursor-pointer items-center justify-center border-none bg-none px-0 py-5 text-[1em] font-semibold transition-all duration-300 ${
									active
										? 'bg-white text-indigo-400'
										: 'text-[#6c757d] hover:bg-[#e9ecef] hover:text-[#495057]'
								}`}
							>
								<span className="mr-2">{item.icon}</span>
								{item.label}
								{active && (
									<span className="absolute right-0 bottom-0 left-0 h-[3px] rounded-b bg-linear-to-r from-indigo-400 to-purple-600" />
								)}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};
