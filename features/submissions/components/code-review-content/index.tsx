"use client";

import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DetailSection } from "./detail-section";
import { OverallSection } from "./overall-section";

export const CodeReviewContent = () => {

	const storedSubmissionData = localStorage.getItem("storedSubmission");
	const storedSubmission = storedSubmissionData
		? JSON.parse(storedSubmissionData)
		: null;
	const { summary, hardCriteria, flexibleCriteria } = storedSubmission
		? storedSubmission
		: { hardCriteria: [], flexibleCriteria: [] };
	return (
		<TooltipProvider>
			<div className="flex flex-col gap-6 dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/10 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs">
				<OverallSection summary={summary} />
				<Separator />
				<DetailSection hardCriteria={hardCriteria} flexibleCriteria={flexibleCriteria} />
			</div>
		</TooltipProvider>
	);
};
