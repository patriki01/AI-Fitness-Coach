import {
	ChevronLeft,
	ChevronRight,
	Calendar as CalendarIcon,
	LayoutGrid,
	Rows
} from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/common';

export const CalendarHeader = ({
	currentDate,
	view,
	onNext,
	onPrev,
	onToday,
	onViewChange
}: {
	currentDate: Date;
	view: 'month' | 'week';
	onNext: () => void;
	onPrev: () => void;
	onToday: () => void;
	onViewChange: (v: 'month' | 'week') => void;
}) => (
	<div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
		<div className="flex items-center gap-2">
			<div className="rounded-lg bg-indigo-50 p-2">
				<CalendarIcon className="h-6 w-6 text-indigo-600" />
			</div>
			<h1 className="text-2xl font-bold text-slate-900">Training Calendar</h1>
		</div>

		<div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
			<div className="mr-2 flex items-center rounded-lg bg-slate-100 p-1">
				<button
					onClick={() => onViewChange('month')}
					className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${view === 'month' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-700'}`}
				>
					<div className="flex items-center gap-2">
						<LayoutGrid className="h-4 w-4" />
						<span className="hidden sm:inline">Month</span>
					</div>
				</button>
				<button
					onClick={() => onViewChange('week')}
					className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${view === 'week' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-700'}`}
				>
					<div className="flex items-center gap-2">
						<Rows className="h-4 w-4" />
						<span className="hidden sm:inline">Week</span>
					</div>
				</button>
			</div>

			<div className="flex items-center gap-1">
				<Button variant="outline" size="icon" onClick={onPrev}>
					<ChevronLeft className="h-4 w-4" />
				</Button>
				<div className="w-32 text-center font-semibold text-slate-700 select-none">
					{format(
						currentDate,
						view === 'month' ? 'MMMM yyyy' : "'Week of' MMM d"
					)}
				</div>
				<Button variant="outline" size="icon" onClick={onNext}>
					<ChevronRight className="h-4 w-4" />
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onClick={onToday}
					className="ml-1 text-xs"
				>
					Today
				</Button>
			</div>
		</div>
	</div>
);
