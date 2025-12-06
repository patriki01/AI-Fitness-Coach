import { type FieldErrors, type UseFormRegister } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { type TrainingPlanFormValues } from '@/app/trainings/new/page';

export const PlanNameInput = ({
	register,
	errors
}: {
	register: UseFormRegister<TrainingPlanFormValues>;
	errors: FieldErrors<TrainingPlanFormValues>;
}) => (
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
);
