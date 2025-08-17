import { Info } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export const CriteriaTooltip = ({
	description,
	children,
}: {
	title: string;
	description?: string;
	children: React.ReactNode;
}) => {
	if (!description) return <>{children}</>;

	return (
		<Tooltip delayDuration={500}>
			<TooltipTrigger asChild>
				<div className="flex items-center gap-1 cursor-help">
					{children}
					<Info className="size-3 text-muted-foreground" />
				</div>
			</TooltipTrigger>
			<TooltipContent>
				<p className="max-w-xs text-xs">{description}</p>
			</TooltipContent>
		</Tooltip>
	);
};
