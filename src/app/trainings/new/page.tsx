'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PlanNameInput } from '@/components/new-training-plan/plan-name-input';
import { GoalSelector } from '@/components/new-training-plan/goal-selector';
import { DurationInput } from '@/components/new-training-plan/duration-input';
import { EquipmentCheckboxes } from '@/components/new-training-plan/equipment-checkboxes';
import { ExperienceSelect } from '@/components/new-training-plan/experience-select';
import { NotesTextarea } from '@/components/new-training-plan/notes-textarea';
import { WorkoutsPerWeekSelect } from '@/components/new-training-plan/workouts-per-week-select';

export type TrainingPlanFormValues = {
	name: string;
	goal: 'fat-burning' | 'muscle-gain' | 'endurance';
	experience: 'Beginner' | 'Intermediate' | 'Advanced';
	workoutsPerWeek:
		| '2 days'
		| '3 days'
		| '4 days'
		| '5 days'
		| '6 days'
		| '7 days';
	duration: number;
	equipment: string[];
	notes: string;
};

const Page = () => {
	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		formState: { errors }
	} = useForm<TrainingPlanFormValues>({
		defaultValues: {
			name: '',
			goal: 'fat-burning',
			experience: 'Beginner',
			workoutsPerWeek: '3 days',
			duration: 8,
			equipment: [],
			notes: ''
		}
	});

	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const onSubmit = async (data: TrainingPlanFormValues) => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch('/api/generate-training-plan', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			});
			const json = await res.json();
			if (json.success) {
				console.log('Generated plan:', json.plan);
				router.push('/trainings');
			} else {
				setError(json.error ?? 'Failed to generate plan');
			}
		} catch (err) {
			setError(`Error generating plan: ${(err as Error).message}`);
		}
		setLoading(false);
	};

	return (
		<div className="mx-auto max-w-[800px] py-10">
			<h2 className="mb-8 text-2xl font-bold">Create New Training Plan</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<PlanNameInput register={register} errors={errors} />
				<GoalSelector selectedGoal={watch('goal')} setValue={setValue} />
				<ExperienceSelect control={control} />
				<WorkoutsPerWeekSelect control={control} />
				<DurationInput register={register} errors={errors} />
				<EquipmentCheckboxes control={control} />
				<NotesTextarea register={register} />
				<Button
					type="submit"
					className="w-full bg-linear-to-br from-indigo-400 to-purple-600 text-white"
					disabled={loading}
				>
					Generate AI Training Plan
				</Button>
			</form>
			{loading && (
				<div className="mt-6 flex flex-col items-center justify-center gap-2">
					<Loader className="h-8 w-8 animate-spin text-indigo-600" />
					<div className="text-center font-semibold text-indigo-600">
						Please wait, your plan is being generated...
					</div>
				</div>
			)}
			{error && (
				<div className="mt-6 text-center font-semibold text-red-600">
					{error}
				</div>
			)}
		</div>
	);
};

export default Page;
