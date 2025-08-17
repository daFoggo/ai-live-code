import type { ReactNode } from "react";
import { ExerciseHeader } from "@/components/layout/exercise-header";

const SubmissionDetailLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-col justify-items-center items-center bg-background min-h-[100dvh] text-foreground">
			<ExerciseHeader />
			<main className="flex-1 w-full">{children}</main>
		</div>
	);
};

export default SubmissionDetailLayout;
