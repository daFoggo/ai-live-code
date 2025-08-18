import type { ReactNode } from "react";
import { CourseHeader } from "@/components/layout/course-header";
import { PtitChat } from "@/features/ptit-chat";

const CourseDetailLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-col justify-items-center items-center bg-background h-dvh text-foreground">
			<CourseHeader />
			<main className="flex-1 w-full">{children}</main>
			<PtitChat />
		</div>
	);
};

export default CourseDetailLayout;
