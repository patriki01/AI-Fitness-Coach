'use server';

import OpenAI from 'openai';

import {
	createTrainingPlan,
	createWorkout,
	createWorkoutItem
} from '@/modules/training-plan/server';
import { type TrainingPlanFormValues } from '@/app/(app)/trainings/new/page';

const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

type GeneratedPlan = {
	plan: {
		description: string;
		durationWeeks: number;
	};
	workouts: {
		name: string;
		day: number;
		date: string;
		estimatedDurationMin: number;
		items: {
			name: string;
			type: 'volumeBased' | 'timeBased';
			sets: number;
			reps: number | null;
			time: number | null;
		}[];
	}[];
};

const parseWorkoutsPerWeek = (value: string): number => parseInt(value);

export const generateTrainingPlan = async (
	values: TrainingPlanFormValues,
	userId: string
) => {
	const workoutsPerWeek = parseWorkoutsPerWeek(values.workoutsPerWeek);

	const today = new Date().toISOString().slice(0, 10);

	const systemPrompt = `
You are a professional fitness coach and training plan generator.

You must return only valid JSON without explanations, comments, or markdown.

The JSON structure must follow this exactly:

{
  "plan": {
    "description": string,
    "durationWeeks": number
  },
  "workouts": [
    {
      "name": string,
      "day": number,
      "date": string,
      "estimatedDurationMin": number,
      "items": [
        {
          "name": string,
          "type": "volumeBased" | "timeBased",
          "sets": number,
          "reps": number | null,
          "time": number | null, // For timeBased, must be in minutes
        }
      ]
    }
  ]
}

Rules:
- Generate exactly ${workoutsPerWeek} workouts per week, every week, with no skipped weeks.
- Workouts must be evenly spaced throughout each week (e.g., for 3 workouts/week: Monday, Wednesday, Friday).
- Each workout must include a "date" field in ISO 8601 format (YYYY-MM-DD), starting from today (${today}) and continuing for ${values.duration} weeks.
- Total workouts = ${workoutsPerWeek * values.duration}
- For every workout item with "type": "timeBased", the "time" field must be the duration in minutes (number).
- Respect goal, experience, and equipment
- Beginner = simple exercises, lighter volume
- Do not include medical warnings or disclaimers
- Make the plan realistic and progressive
`;

	const userPrompt = `
Create a ${values.goal} training plan for a ${values.experience} person.

Training details:
- Goal: ${values.goal}
- Experience: ${values.experience}
- Workouts per week: ${values.workoutsPerWeek}
- Duration: ${values.duration} weeks
- Available equipment: ${values.equipment.join(', ')}
- Notes: ${values.notes ?? 'N/A'}

The plan must have exactly ${workoutsPerWeek} workouts per week, scheduled evenly (e.g., Mon/Wed/Fri for 3 workouts/week). The first workout should be scheduled for today (${today}). Each workout must include a "date" field in ISO 8601 format.

Return only JSON in the exact structure described.
Name workouts realistically.
`;

	try {
		const response = await client.chat.completions.create({
			model: 'gpt-4.1-mini', // I think this is okay to use
			temperature: 0.4,
			messages: [
				{ role: 'system', content: systemPrompt },
				{ role: 'user', content: userPrompt }
			]
		});

		const content = response.choices[0].message.content;

		if (!content) {
			throw new Error('No response from OpenAI');
		}

		const data: GeneratedPlan = JSON.parse(content);

		const trainingPlan = await createTrainingPlan({
			name: values.name,
			description: data.plan.description,
			durationWeeks: data.plan.durationWeeks,
			isActive: true,
			userId,
			startDate: new Date(),
			endDate: undefined
		});

		for (const workout of data.workouts) {
			const createdWorkout = await createWorkout({
				name: workout.name,
				date: new Date(workout.date),
				isCompleted: false,
				estimatedDurationMin: workout.estimatedDurationMin,
				trainingPlanId: trainingPlan.id,
				userId: trainingPlan.userId
			});

			for (const item of workout.items) {
				await createWorkoutItem({
					name: item.name,
					type: item.type,
					sets: item.sets,
					reps: item.reps ?? undefined,
					time: item.time ?? undefined,
					isCompleted: false,
					workoutId: createdWorkout.id,
					dateCompleted: undefined
				});
			}
		}

		return {
			success: true,
			raw: content
		};
	} catch (error: unknown) {
		console.error('OpenAI training plan error:', error);

		return {
			success: false,
			error: error instanceof Error ? error.message : 'Failed to generate plan'
		};
	}
};
