import { Save } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/common';

type SaveProgressButtonProps = {
	handleSave: () => void;
	isPending: boolean;
};

export const SaveProgressButton = ({
	handleSave,
	isPending
}: SaveProgressButtonProps) => (
	<Button
		onClick={handleSave}
		disabled={isPending}
		className="flex w-full items-center gap-2 shadow-lg shadow-indigo-200 md:w-auto"
	>
		{isPending ? (
			<>
				<div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
				Saving...
			</>
		) : (
			<>
				<Save className="h-4 w-4" />
				Save Progress
			</>
		)}
	</Button>
);
