import type { ReactNode } from "react";
import { ExerciseHeader } from "@/components/layout/exercise-header";
import { PtitChat } from "@/features/ptit-chat";

const ExercisesLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-col justify-items-center items-center bg-background min-h-[100dvh] text-foreground">
			<ExerciseHeader />
			<main className="flex-1 p-2 sm:p-6 w-full">{children}</main>
			<PtitChat />
		</div>
	);
};

export default ExercisesLayout;
