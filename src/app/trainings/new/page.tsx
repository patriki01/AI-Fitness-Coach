'use client';

import { useForm, Controller } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const goals = [
	{ label: 'Fat Burning', value: 'fat-burning', icon: '🔥' },
	{ label: 'Muscle Gain', value: 'muscle-gain', icon: '💪' },
	{ label: 'Endurance', value: 'endurance', icon: '⚡' }
];

const equipmentOptions = [
	{ label: 'Dumbbells', value: 'dumbbells' },
	{ label: 'Barbell', value: 'barbell' },
	{ label: 'Kettlebells', value: 'kettlebells' },
	{ label: 'Resistance Bands', value: 'bands' },
	{ label: 'Pull-up Bar', value: 'pullup-bar' },
	{ label: 'Cardio Equipment', value: 'cardio' }
];

const Page = () => {
	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		formState: { errors }
	} = useForm({
		defaultValues: {
			name: '',
			goal: 'fat-burning',
			experience: 'Beginner',
			workoutsPerWeek: '3 days',
			duration: 8,
			equipment: ['dumbbells', 'barbell', 'bands'],
			notes: ''
		}
	});

	const selectedGoal = watch('goal');

	const onSubmit = (data: any) => {
		// Handle form submission (API call, etc.)
		console.log(data);
	};

	return (
		<div className="mx-auto max-w-[800px] py-10">
			<h2 className="mb-8 text-2xl font-bold">Create New Training Plan</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				{/* Plan Name */}
				<div>
					<label
						htmlFor="plan-name"
						className="mb-2 block font-semibold text-[#495057]"
					>
						Plan Name
					</label>
					<Input
						id="plan-name"
						{...register('name', { required: true })}
						placeholder="e.g., Summer Shred 2024"
					/>
					{errors.name && (
						<span className="text-sm text-red-500">Plan name is required</span>
					)}
				</div>

				{/* Primary Goal */}
				<div>
					<span className="mb-2 block font-semibold text-[#495057]">
						Primary Goal
					</span>
					<div className="grid grid-cols-3 gap-4">
						{goals.map(goal => (
							<button
								type="button"
								key={goal.value}
								id={`goal-${goal.value}`}
								aria-pressed={selectedGoal === goal.value}
								className={cn(
									'flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 p-6 text-center font-semibold transition-all',
									selectedGoal === goal.value
										? 'border-indigo-400 bg-linear-to-br from-indigo-400 to-purple-600 text-white'
										: 'border-[#e9ecef] hover:-translate-y-1 hover:border-indigo-400'
								)}
								onClick={() => setValue('goal', goal.value)}
							>
								<span className="mb-2 text-3xl">{goal.icon}</span>
								{goal.label}
							</button>
						))}
					</div>
				</div>

				{/* Experience Level */}
				<div>
					<label
						htmlFor="experience"
						className="mb-2 block font-semibold text-[#495057]"
					>
						Experience Level
					</label>
					<Controller
						control={control}
						name="experience"
						render={({ field }) => (
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<SelectTrigger id="experience" className="w-full">
									<SelectValue placeholder="Select experience" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Beginner">Beginner</SelectItem>
									<SelectItem value="Intermediate">Intermediate</SelectItem>
									<SelectItem value="Advanced">Advanced</SelectItem>
								</SelectContent>
							</Select>
						)}
					/>
				</div>

				{/* Workouts Per Week */}
				<div>
					<label
						htmlFor="workouts-per-week"
						className="mb-2 block font-semibold text-[#495057]"
					>
						Workouts Per Week
					</label>
					<Controller
						control={control}
						name="workoutsPerWeek"
						render={({ field }) => (
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<SelectTrigger id="workouts-per-week" className="w-full">
									<SelectValue placeholder="Select frequency" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="3 days">3 days</SelectItem>
									<SelectItem value="4 days">4 days</SelectItem>
									<SelectItem value="5 days">5 days</SelectItem>
									<SelectItem value="6 days">6 days</SelectItem>
								</SelectContent>
							</Select>
						)}
					/>
				</div>

				{/* Duration */}
				<div>
					<label
						htmlFor="duration"
						className="mb-2 block font-semibold text-[#495057]"
					>
						Duration (weeks)
					</label>
					<Input
						id="duration"
						type="number"
						min={1}
						max={52}
						{...register('duration', { required: true, min: 1, max: 52 })}
					/>
					{errors.duration && (
						<span className="text-sm text-red-500">
							Enter a valid duration (1-52 weeks)
						</span>
					)}
				</div>

				{/* Equipment Available */}
				<div>
					<span className="mb-2 block font-semibold text-[#495057]">
						Equipment Available
					</span>
					<div className="grid grid-cols-2 gap-3">
						{equipmentOptions.map(eq => (
							<label
								key={eq.value}
								htmlFor={`equipment-${eq.value}`}
								className="flex items-center gap-2 font-medium"
							>
								<Controller
									control={control}
									name="equipment"
									render={({ field }) => (
										<Checkbox
											id={`equipment-${eq.value}`}
											checked={field.value?.includes(eq.value)}
											onCheckedChange={checked => {
												const newValue = checked
													? [...(field.value || []), eq.value]
													: (field.value || []).filter(
															(v: string) => v !== eq.value
														);
												field.onChange(newValue);
											}}
										/>
									)}
								/>
								{eq.label}
							</label>
						))}
					</div>
				</div>

				{/* Additional Notes */}
				<div>
					<label
						htmlFor="notes"
						className="mb-2 block font-semibold text-[#495057]"
					>
						Additional Notes
					</label>
					<Textarea
						id="notes"
						{...register('notes')}
						rows={4}
						placeholder="Any injuries, preferences, or specific requirements..."
					/>
				</div>

				{/* Submit Button */}
				<Button
					type="submit"
					className="w-full bg-linear-to-br from-indigo-400 to-purple-600 text-white"
				>
					Generate AI Training Plan
				</Button>
			</form>
		</div>
	);
};

export default Page;
