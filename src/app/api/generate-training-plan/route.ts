import { type NextRequest, NextResponse } from 'next/server';

import { generateTrainingPlan } from '@/app/actions/generateTrainingPlan';

export const POST = async (req: NextRequest) => {
	const data = await req.json();
	const result = await generateTrainingPlan(data);
	return NextResponse.json(result);
};
