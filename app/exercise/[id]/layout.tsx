import type { ReactNode } from "react";
import { PtitChat } from "@/features/ptit-chat";

const ExerciseDetailLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			{children}
			<PtitChat />
		</>
	);
};

export default ExerciseDetailLayout;
