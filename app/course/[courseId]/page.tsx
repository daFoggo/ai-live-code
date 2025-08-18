import { Suspense } from "react";
import { PageLoading } from "@/components/common/page-loading";
import { CourseDetail } from "@/features/courses";

const CourseDetailPage = () => {
	return (
		<Suspense
			fallback={<PageLoading variant="dots" text="Loading members page..." />}
		>
			<CourseDetail />
		</Suspense>
	);
};

export default CourseDetailPage;
