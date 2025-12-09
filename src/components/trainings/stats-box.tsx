import React from 'react';

type BoxProps = {
	number: number;
	text: string;
};

const StatsBox = ({ text, number }: BoxProps) => (
	<div className="rounded-2xl bg-gray-100 p-8 text-center shadow">
		<div className="text-4xl font-bold text-indigo-500">{number}</div>
		<div className="font-semibold text-gray-600">{text}</div>
	</div>
);

export default StatsBox;
