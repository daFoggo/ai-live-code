"use client";
import { BugPlay, NotebookPen, Play, SendHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";
import { AsyncButton } from "@/components/common/async-button";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSubmissionsSWR } from "@/features/submissions";
import type { IExercise } from "../utils/types";

interface IExerciseToolBarProps {
	getCurrentCode: () => string;
	exerciseData: IExercise;
}

const ExerciseToolBar = ({
	getCurrentCode,
	exerciseData,
}: IExerciseToolBarProps) => {
	const router = useRouter();
	const { submitCode, isProcessingSubmission } =
		useSubmissionsSWR();

	const handleSubmitCode = useCallback(async () => {
		const currentCode = getCurrentCode();
		if (!currentCode.trim()) {
			toast.error("Please write your code before submitting!");
			return;
		}

		const result = await submitCode({
			inputs: {
				purpose: exerciseData.description,
				example_code: exerciseData.solution || "",
				user_code: currentCode,
			},
			response_mode: "blocking",
			user: "abc-123",
		});

		if (result) {
			localStorage.setItem("storedSubmission", JSON.stringify(result.data.outputs.message));
			localStorage.setItem("storedUserCode", JSON.stringify(currentCode));
			localStorage.setItem("storedExercise", JSON.stringify({ id: exerciseData.problem_id, name: exerciseData.name }));
			console.log("Stored submission data:", result);
		}

		router.push(`/submission/aMonGus`);
	}, [submitCode, getCurrentCode, exerciseData, router]);

	return (
		<TooltipProvider>
			<div className="flex items-center gap-2">
				<div className="flex items-center gap-0.5">
					{/** Run Debug **/}
					<Tooltip>
						<TooltipTrigger asChild>
							<AsyncButton
								className="rounded-r-none"
								icon={<BugPlay />}
								disabled={isProcessingSubmission}
							/>
						</TooltipTrigger>
						<TooltipContent>
							<p>Run debug</p>
						</TooltipContent>
					</Tooltip>
					{/** Run code **/}
					<Tooltip>
						<TooltipTrigger asChild>
							<AsyncButton
								className="rounded-none"
								icon={<Play />}
								disabled={isProcessingSubmission}
							/>
						</TooltipTrigger>
						<TooltipContent>
							<p>Run code</p>
						</TooltipContent>
					</Tooltip>
					{/** Submit **/}
					<Tooltip>
						<TooltipTrigger asChild>
							<AsyncButton
								className="rounded-l-none"
								icon={<SendHorizontal />}
								iconPosition="right"
								onClick={handleSubmitCode}
								isLoading={isProcessingSubmission}
							>
								Submit
							</AsyncButton>
						</TooltipTrigger>
						<TooltipContent>
							<p>Submit your solution</p>
						</TooltipContent>
					</Tooltip>
				</div>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="secondary">
							<NotebookPen />
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Open note</p>
					</TooltipContent>
				</Tooltip>
			</div>
		</TooltipProvider>
	);
};

export default ExerciseToolBar;
