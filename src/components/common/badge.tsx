// Used from Shadcn-lite
export const Badge = ({ children, variant = 'default', className = '' }: any) => {
	const base =
		'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
	const variants: any = {
		default:
			'border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80',
		success:
			'border-transparent bg-emerald-500 text-white hover:bg-emerald-600',
		secondary:
			'border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200',
		outline: 'text-slate-500 border-slate-200'
	};
	return (
		<div className={`${base} ${variants[variant]} ${className}`}>
			{children}
		</div>
	);
};
