import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui';

type BackToProps = {
	type: "workout" | "calendar";
	trainingId: string;
}

const TYPE = {
	"calendar": {
		text: "Back to Calendar",
		route: "/calendar",
	},
	"workout": {
		text: "Back to Training",
		route: "/trainings",
	}
}

export const BackToButton = ({type, trainingId}: BackToProps) => {
	const router = useRouter();
	const config = TYPE[type];
	const route = type === "workout" ? "/trainings/" + trainingId : "/calendar";
	return (
		<div className="flex items-center justify-between">
			<Button
				variant="ghost"
				onClick={() => router.push(route)}
				className="gap-1 text-slate-500 transition-all hover:text-slate-900"
			>
				<ChevronLeft className="h-5 w-5" />
				{config.text}
			</Button>
		</div>
	);
};
