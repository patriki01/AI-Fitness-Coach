'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
	{ label: 'Calendar', icon: '📅', href: '/calendar' },
	{ label: 'Profile', icon: '👤', href: '/profile' },
	{ label: 'Create Plan', icon: '➕', href: '/trainings/new' },
	{ label: 'My Plans', icon: '📋', href: '/trainings' }
];

export const Navbar = () => {
	const pathname = usePathname();

	return (
		<nav className="flex border-b-2 border-[#e9ecef] bg-[#f8f9fa]">
			{navItems.map(item => {
				const isCalendar = item.href === '/calendar';
				const isCreatePlan = item.href === '/trainings/new';
				const isMyPlans = item.href === '/trainings';

				const active =
					(isCalendar && (pathname === '/' || pathname === '/calendar')) ||
					(item.href === '/profile' && pathname === '/profile') ||
					(isCreatePlan && pathname === '/trainings/new') ||
					(isMyPlans &&
						pathname.startsWith('/trainings') &&
						pathname !== '/trainings/new');

				return (
					<Link
						key={item.label}
						href={item.href}
						className={`relative flex flex-1 cursor-pointer items-center justify-center border-none bg-none px-0 py-5 text-[1em] font-semibold transition-all duration-300 ${
							active
								? 'bg-white text-indigo-400'
								: 'text-[#6c757d] hover:bg-[#e9ecef] hover:text-[#495057]'
						} `}
					>
						<span className="mr-2">{item.icon}</span>
						{item.label}
						{active && (
							<span className="absolute right-0 bottom-0 left-0 h-[3px] rounded-b bg-linear-to-r from-indigo-400 to-purple-600" />
						)}
					</Link>
				);
			})}
		</nav>
	);
};
