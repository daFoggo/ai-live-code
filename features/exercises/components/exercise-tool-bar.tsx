"use client";
import { BugPlay, NotebookPen, Play, SendHorizontal } from "lucide-react";
import { AsyncButton } from "@/components/common/async-button";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const ExerciseToolBar = () => {
	return (
		<div className="flex items-center gap-2">
			<div className="flex items-center gap-0.5">
				{/* Run Debug */}
				<Tooltip>
					<TooltipTrigger asChild>
						<AsyncButton className="rounded-r-none" icon={<BugPlay />} />
					</TooltipTrigger>
					<TooltipContent>
						<p>Run debug</p>
					</TooltipContent>
				</Tooltip>

				{/* Run code */}
				<Tooltip>
					<TooltipTrigger asChild>
						<AsyncButton className="rounded-none" icon={<Play />} />
					</TooltipTrigger>
					<TooltipContent>
						<p>Run code</p>
					</TooltipContent>
				</Tooltip>

				{/* Submit */}
				<Tooltip>
					<TooltipTrigger asChild>
						<AsyncButton
							className="rounded-l-none"
							icon={<SendHorizontal />}
							iconPosition="right"
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
	);
};

export default ExerciseToolBar;
