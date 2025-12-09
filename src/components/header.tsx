'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	CalendarDays,
	ClipboardList,
	Dumbbell,
	Menu,
	Plus,
	User,
	X
} from 'lucide-react';

const navItems = [
	{
		label: 'Calendar',
		icon: CalendarDays,
		href: '/calendar',
		match: (p: string) => p === '/' || p.startsWith('/calendar')
	},
	{
		label: 'My Plans',
		icon: ClipboardList,
		href: '/trainings',
		match: (p: string) => p.startsWith('/trainings') && p !== '/trainings/new'
	},
	{
		label: 'Profile',
		icon: User,
		href: '/profile',
		match: (p: string) => p.startsWith('/profile')
	}
];

export const Header = () => {
	const pathname = usePathname();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
	const closeMenu = () => setIsMobileMenuOpen(false);

	return (
		<header className="relative w-full bg-gradient-to-br from-indigo-400 to-purple-600 text-white shadow-md">
			<div className="container flex h-auto min-h-[70px] items-center justify-between px-6 py-4">
				<Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-purple-600 shadow-sm">
						<Dumbbell size={20} strokeWidth={2.5} />
					</div>
					<h1 className="text-lg font-bold tracking-tight">AI Coach</h1>
				</Link>

				<div className="hidden items-center gap-8 md:flex">
					<nav>
						<ul className="flex items-center gap-2">
							{navItems.map(item => {
								const isActive = item.match?.(pathname);
								const Icon = item.icon;

								return (
									<li key={item.label}>
										<Link
											href={item.href}
											className={`group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
												isActive
													? 'bg-white/20 text-white shadow-inner'
													: 'text-indigo-50 hover:bg-white/10 hover:text-white'
											}`}
										>
											<Icon
												size={16}
												className={
													isActive
														? 'opacity-100'
														: 'opacity-70 group-hover:opacity-100'
												}
											/>
											{item.label}
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>

					{/* Desktop CTA */}
					<Link
						href="/trainings/new"
						className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-purple-600 shadow-md transition-transform hover:scale-105 hover:shadow-lg active:scale-95"
					>
						<Plus size={18} strokeWidth={3} />
						Create Plan
					</Link>
				</div>

				<button
					onClick={toggleMenu}
					className="rounded-lg p-2 text-white hover:bg-white/10 active:bg-white/20 md:hidden"
					aria-label="Toggle menu"
					aria-expanded={isMobileMenuOpen}
				>
					{isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
			</div>

			{isMobileMenuOpen && (
				<div className="border-t border-white/10 bg-indigo-500 md:hidden">
					<nav className="flex flex-col p-4">
						<ul className="space-y-2">
							{navItems.map(item => {
								const isActive = item.match?.(pathname);
								const Icon = item.icon;

								return (
									<li key={item.label}>
										<Link
											href={item.href}
											onClick={closeMenu}
											className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors ${
												isActive
													? 'bg-white/20 text-white'
													: 'text-indigo-50 hover:bg-white/10 hover:text-white'
											}`}
										>
											<Icon size={20} />
											{item.label}
										</Link>
									</li>
								);
							})}
						</ul>

						<div className="my-4 border-t border-white/10" />

						<Link
							href="/trainings/new"
							onClick={closeMenu}
							className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-base font-bold text-purple-600 shadow-sm transition-transform active:scale-95"
						>
							<Plus size={20} strokeWidth={3} />
							Create Plan
						</Link>
					</nav>
				</div>
			)}
		</header>
	);
};
