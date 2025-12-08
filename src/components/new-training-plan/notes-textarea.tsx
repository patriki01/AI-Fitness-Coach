import { type UseFormRegister } from 'react-hook-form';

import { type TrainingPlanFormValues } from '@/app/(app)/trainings/new/page';
import { Textarea } from '@/components/ui/textarea';

export const NotesTextarea = ({
	register
}: {
	register: UseFormRegister<TrainingPlanFormValues>;
}) => (
	<div>
		<label htmlFor="notes" className="mb-2 block font-semibold text-[#495057]">
			Additional Notes
		</label>
		<Textarea
			id="notes"
			{...register('notes')}
			rows={4}
			placeholder="Any injuries, preferences, or specific requirements..."
		/>
	</div>
);
