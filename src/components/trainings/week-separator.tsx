import React from 'react';

type WeekSeparatorProps = {
	label: string;
};

export const WeekSeparator: React.FC<WeekSeparatorProps> = ({ label }) => (
	<div className="my-4 w-full rounded-lg bg-gray-100 px-4 py-3 text-base font-semibold text-gray-700 shadow-sm">
		{label}
	</div>
);
