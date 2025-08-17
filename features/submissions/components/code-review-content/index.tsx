"use client";

import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DetailSection } from "./detail-section";
import { OverallSection } from "./overall-section";

export const CodeReviewContent = () => {
	return (
		<TooltipProvider>
			<div className="flex flex-col gap-6 dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/10 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs">
				<OverallSection />
				<Separator />
				<DetailSection />
			</div>
		</TooltipProvider>
	);
};
