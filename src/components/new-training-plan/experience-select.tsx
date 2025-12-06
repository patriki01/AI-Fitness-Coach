import { type Control, Controller } from 'react-hook-form';

import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem
} from '@/components/ui/select';
import { type TrainingPlanFormValues } from '@/app/trainings/new/page';

export const ExperienceSelect = ({
	control
}: {
	control: Control<TrainingPlanFormValues>;
}) => (
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
);
