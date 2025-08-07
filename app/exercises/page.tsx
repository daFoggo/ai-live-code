import { Suspense } from "react";
import { PageLoading } from "@/components/common/page-loading";
import { Exercises } from "@/features/exercises";

const ExercisesPage = () => {
	return (
		<Suspense
			fallback={<PageLoading variant="dots" text="Loading members page..." />}
		>
			<Exercises />
		</Suspense>
	);
};

export default ExercisesPage;
