import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui';

export const BackToCalendarButton = () => {
	const router = useRouter();

	return (
		<div className="flex items-center justify-between">
			<Button
				variant="ghost"
				onClick={() => router.push('/calendar')}
				className="gap-1 text-slate-500 transition-all hover:text-slate-900"
			>
				<ChevronLeft className="h-5 w-5" />
				Back to Calendar
			</Button>
		</div>
	);
};
