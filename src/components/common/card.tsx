// Used from Shadcn-lite
export const Card = ({ children, className = '' }: any) => (
	<div
		className={`rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm ${className}`}
	>
		{children}
	</div>
);
