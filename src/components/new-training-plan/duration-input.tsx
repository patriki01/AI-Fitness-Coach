import { type FieldErrors, type UseFormRegister } from 'react-hook-form';

import { type TrainingPlanFormValues } from '@/app/(app)/trainings/new/page';
import { Input } from '@/components/ui/input';

export const DurationInput = ({
	register,
	errors
}: {
	register: UseFormRegister<TrainingPlanFormValues>;
	errors: FieldErrors<TrainingPlanFormValues>;
}) => (
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
			min={4}
			max={16}
			{...register('duration', { required: true, min: 4, max: 16 })}
		/>
		{errors.duration && (
			<span className="text-sm text-red-500">
				Enter a valid duration (4-16 weeks)
			</span>
		)}
	</div>
);
