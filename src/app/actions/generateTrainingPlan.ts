'use server';

import OpenAI from 'openai';

import {
	createTrainingPlan,
	createWorkout,
	createWorkoutItem
} from '@/modules/training-plan/server';

import { type TrainingPlanFormValues } from '../trainings/new/page';

const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

type GeneratedPlan = {
	plan: {
		name: string;
		description: string;
		durationWeeks: number;
	};
	workouts: {
		name: string;
		day: number;
		estimatedDurationMin: number;
		items: {
			name: string;
			type: 'volumeBased' | 'timeBased';
			sets: number;
			reps: number | null;
			time: number | null;
			weight: number | null;
		}[];
	}[];
};

const parseWorkoutsPerWeek = (value: string): number => parseInt(value);

export const generateTrainingPlan = async (values: TrainingPlanFormValues) => {
	const workoutsPerWeek = parseWorkoutsPerWeek(values.workoutsPerWeek);

	const systemPrompt = `
You are a professional fitness coach and training plan generator.

You must return only valid JSON without explanations, comments, or markdown.

The JSON structure must follow this exactly:

{
  "plan": {
    "name": string,
    "description": string,
    "durationWeeks": number
  },
  "workouts": [
    {
      "name": string,
      "day": number,
      "estimatedDurationMin": number,
      "items": [
        {
          "name": string,
          "type": "volumeBased" | "timeBased",
          "sets": number,
          "reps": number | null,
          "time": number | null,
          "weight": number | null
        }
      ]
    }
  ]
}

Rules:
- Generate exactly ${workoutsPerWeek} workouts per week
- Generate for ${values.duration} weeks
- Total workouts = ${workoutsPerWeek * values.duration}
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

Return only JSON in the exact structure described.
Name the plan and workouts realistically.
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

		//TODO: delete later
		console.log('OpenAI response:', content);

		const data: GeneratedPlan = JSON.parse(content);

		const trainingPlan = await createTrainingPlan({
			name: data.plan.name,
			description: data.plan.description,
			durationWeeks: data.plan.durationWeeks,
			isActive: true,
			userId: 1, //TODO: Replace with real user ID
			startDate: new Date(),
			endDate: undefined
		});

		for (const workout of data.workouts) {
			const createdWorkout = await createWorkout({
				name: workout.name,
				date: new Date().toISOString(),
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
					weight: item.weight ?? undefined,
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
	} catch (error: any) {
		console.error('OpenAI training plan error:', error);

		return {
			success: false,
			error: error.message ?? 'Failed to generate plan'
		};
	}
};
