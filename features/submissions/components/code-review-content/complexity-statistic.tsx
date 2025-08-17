import { Clock, HardDrive } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const ComplexityStatistic = ({
	timeComplexity,
	spaceComplexity,
}: {
	timeComplexity?: string;
	spaceComplexity?: string;
}) => {
	if (!timeComplexity && !spaceComplexity) return null;

	return (
		<div className="bg-gradient-to-r from-blue-50 dark:from-blue-950/30 to-purple-50 dark:to-purple-950/30 p-4 border border-blue-200 dark:border-blue-800 rounded-lg">
			<div className="gap-3 grid grid-cols-1 sm:grid-cols-2">
				{timeComplexity && (
					<div className="flex items-center gap-2">
						<Clock className="size-3 text-blue-500" />
						<span className="font-medium text-xs">Time:</span>
						<Badge
							variant="outline"
							className="bg-blue-100 dark:bg-blue-900/50 border-blue-300 dark:border-blue-700 font-mono text-blue-700 dark:text-blue-300 text-xs"
						>
							{timeComplexity}
						</Badge>
					</div>
				)}
				{spaceComplexity && (
					<div className="flex items-center gap-2">
						<HardDrive className="size-3 text-purple-500" />
						<span className="font-medium text-xs">Space:</span>
						<Badge
							variant="outline"
							className="bg-purple-100 dark:bg-purple-900/50 border-purple-300 dark:border-purple-700 font-mono text-purple-700 dark:text-purple-300 text-xs"
						>
							{spaceComplexity}
						</Badge>
					</div>
				)}
			</div>
		</div>
	);
};
