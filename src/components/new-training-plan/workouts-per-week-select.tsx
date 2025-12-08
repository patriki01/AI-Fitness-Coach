import { type Control, Controller } from 'react-hook-form';

import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem
} from '@/components/ui';
import { type TrainingPlanFormValues } from '@/app/(app)/trainings/new/page';

export const WorkoutsPerWeekSelect = ({
	control
}: {
	control: Control<TrainingPlanFormValues>;
}) => (
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
						<SelectItem value="2 days">2 days</SelectItem>
						<SelectItem value="3 days">3 days</SelectItem>
						<SelectItem value="4 days">4 days</SelectItem>
						<SelectItem value="5 days">5 days</SelectItem>
						<SelectItem value="6 days">6 days</SelectItem>
						<SelectItem value="7 days">7 days</SelectItem>
					</SelectContent>
				</Select>
			)}
		/>
	</div>
);
