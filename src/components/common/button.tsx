// Used from Shadcn-lite
export const Button = ({
	className = '',
	variant = 'primary',
	size = 'md',
	...props
}: any) => {
	const base =
		'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';
	const variants: any = {
		primary: 'bg-slate-900 text-white hover:bg-slate-800',
		ghost: 'hover:bg-slate-100 text-slate-700',
		outline: 'border border-slate-200 hover:bg-slate-100'
	};
	const sizes: any = {
		icon: 'h-9 w-9',
		sm: 'h-8 px-3 text-xs',
		md: 'h-10 py-2 px-4'
	};
	return (
		<button
			className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
			{...props}
		/>
	);
};
