import { BotMessageSquare, Loader2, MessageCircleDashed } from "lucide-react";
import { useState } from "react";
import { AsyncButton } from "@/components/common/async-button";
import EmptyData from "@/components/common/empty-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

interface ICodeReviewerProps {
	hasNewReview: boolean;
	isReviewing: boolean;
	reviewMessages?: string[];
}

const CodeReviewer = ({
	hasNewReview,
	isReviewing,
	reviewMessages,
}: ICodeReviewerProps) => {
	const [hasSeenLatestReview, setHasSeenLatestReview] = useState(false);

	const shouldShowBadge = hasNewReview && !hasSeenLatestReview;

	const handleSheetOpen = () => {
		setHasSeenLatestReview(true);
	};

	if (hasNewReview && hasSeenLatestReview) {
		setHasSeenLatestReview(false);
	}

	return (
		<Sheet>
			<SheetTrigger asChild className="cursor-pointer">
				<div className="inline-block relative">
					<AsyncButton
						onClick={handleSheetOpen}
						icon={<BotMessageSquare />}
						isLoading={isReviewing}
					>
						{isReviewing ? "Reviewing..." : "Review"}
					</AsyncButton>

					{shouldShowBadge && (
						<Badge
							className="-top-2 -left-2 absolute flex justify-center items-center p-0 rounded-lg size-4 animate-in duration-300 fade-in-0 zoom-in-95"
							variant="destructive"
						>
							<div className="bg-background rounded-xl size-2 animate-pulse" />
						</Badge>
					)}
				</div>
			</SheetTrigger>

			<SheetContent className="w-full sm:min-w-[625px]">
				<SheetHeader>
					<SheetTitle>Code Review</SheetTitle>
					<SheetDescription>
						{isReviewing
							? "AI Tutor is reviewing your code..."
							: "View your code review results and feedback."}
					</SheetDescription>
				</SheetHeader>

				<div className="flex-1 gap-6 grid auto-rows-min px-4 py-4">
					{isReviewing ? (
						<div className="flex justify-center items-center py-8">
							<div className="flex items-center gap-2 text-muted-foreground">
								<Loader2 className="size-4 animate-spin" />
								<span>Analyzing your code...</span>
							</div>
						</div>
					) : reviewMessages && reviewMessages.length > 0 ? (
						<div className="space-y-4">amongus</div>
					) : (
						<EmptyData
							icon={(className) => (
								<MessageCircleDashed className={className} />
							)}
							message="No reviews available. Start coding to receive feedback."
						/>
					)}
				</div>

				<SheetFooter className="border-t">
					<SheetClose asChild>
						<Button variant="outline">Close</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default CodeReviewer;
