import TrainingPageWrapper from '@/components/trainings/training-page-wrapper';

type TrainingPageProps = {
	params: Promise<{ id: string }>;
};

const Page = async ({ params }: TrainingPageProps) => {
	const { id } = await params;
	return <TrainingPageWrapper planId={id} />;
};

export default Page;
