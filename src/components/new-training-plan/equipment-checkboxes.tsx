import { type Control, Controller } from 'react-hook-form';

import { Checkbox } from '@/components/ui';
import { type TrainingPlanFormValues } from '@/app/(app)/trainings/new/page';

const equipmentOptions = [
	{ label: 'Dumbbells', value: 'dumbbells' },
	{ label: 'Barbell', value: 'barbell' },
	{ label: 'Kettlebells', value: 'kettlebells' },
	{ label: 'Resistance Bands', value: 'bands' },
	{ label: 'Pull-up Bar', value: 'pullup-bar' },
	{ label: 'Cardio Equipment', value: 'cardio' }
];

export const EquipmentCheckboxes = ({
	control
}: {
	control: Control<TrainingPlanFormValues>;
}) => (
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
										? [...(field.value ?? []), eq.value]
										: (field.value ?? []).filter((v: string) => v !== eq.value);
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
);
