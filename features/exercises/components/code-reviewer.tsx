"use client";

import { BotMessageSquare, SearchCode, Send } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AsyncButton } from "@/components/common/async-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useSettings } from "../contexts/code-editor-settings-context";
import { useAIReviewSWR } from "../hooks/use-ai-review-swr";
import type { IExercise, IMessage } from "../utils/types";
import MessageList from "./message-list";

interface ICodeReviewerProps {
	currentCode: string;
	shouldRequestReviewNow: boolean;
	exerciseData?: IExercise;
}

const CodeReviewer = ({
	currentCode,
	shouldRequestReviewNow,
	exerciseData,
}: ICodeReviewerProps) => {
	const [hasNewReview, setHasNewReview] = useState(false);
	const [hasSeenLatestReview, setHasSeenLatestReview] = useState(false);
	const [reviewMessages, setReviewMessages] = useState<IMessage[]>([]);
	const [chatInput, setChatInput] = useState("");
	const [lastReviewedCode, setLastReviewedCode] = useState("");
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const processingRef = useRef(false);
	const lastProcessedReviewId = useRef<string | null>(null);

	const { aiReviewData, requestAIReview, isProcessingAIReview } =
		useAIReviewSWR();
	const { settings } = useSettings();

	useEffect(() => {
		if (
			aiReviewData &&
			aiReviewData.metadata.messageId !== lastProcessedReviewId.current
		) {
			lastProcessedReviewId.current = aiReviewData.metadata.messageId;
			setReviewMessages((prev) => {
				const messageExists = prev.some(
					(msg) => msg.metadata.messageId === aiReviewData.metadata.messageId,
				);
				if (messageExists) {
					return prev;
				}
				return [...prev, aiReviewData];
			});
			setHasNewReview(true);
			setHasSeenLatestReview(false);
		}
	}, [aiReviewData]);

	const shouldShowBadge = hasNewReview && !hasSeenLatestReview;

	const handleSheetOpenChange = useCallback((open: boolean) => {
		setIsSheetOpen(open);
		if (open) {
			setHasSeenLatestReview(true);
		} else {
			setHasNewReview(false);
		}
	}, []);

	const handleRequestReview = useCallback(async () => {
		if (!currentCode.trim() || processingRef.current) return;
		try {
			processingRef.current = true;
			await requestAIReview({
				inputs: {
					mode: settings.codeReview.mode,
					purpose: exerciseData?.description || "",
					example_code: "",
					user_code: currentCode,
				},
				response_mode: "blocking",
				user: "abc-123",
			});
		} catch (error) {
			console.error("Failed to request AI review:", error);
		} finally {
			processingRef.current = false;
		}
	}, [
		currentCode,
		requestAIReview,
		settings.codeReview.mode,
		exerciseData?.description,
	]);

	const handleSendMessage = useCallback(() => {
		if (!chatInput.trim()) return;
		console.log("Send message:", chatInput);
		setChatInput("");
	}, [chatInput]);

	// Auto-request review
	useEffect(() => {
		const shouldRequest =
			shouldRequestReviewNow &&
			currentCode &&
			currentCode.trim().length > 0 &&
			currentCode !== lastReviewedCode &&
			!isProcessingAIReview &&
			!processingRef.current;

		if (shouldRequest) {
			setLastReviewedCode(currentCode);
			handleRequestReview();
		}
	}, [
		currentCode,
		shouldRequestReviewNow,
		lastReviewedCode,
		isProcessingAIReview,
		handleRequestReview,
	]);

	return (
		<Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
			<SheetTrigger asChild className="cursor-pointer">
				<div className="inline-block relative">
					<AsyncButton
						icon={<BotMessageSquare />}
						isLoading={isProcessingAIReview}
					>
						{isProcessingAIReview ? "Reviewing..." : "Review"}
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
			<SheetContent className="flex flex-col w-full sm:min-w-[625px]">
				<SheetHeader>
					<SheetTitle>Code Review</SheetTitle>
					<SheetDescription>
						{isProcessingAIReview
							? "AI Tutor is reviewing your code..."
							: "View your code review results and feedback."}
					</SheetDescription>
				</SheetHeader>
				<div className="flex flex-col flex-1 overflow-hidden">
					<div className="flex-1 px-4 py-4 overflow-y-auto">
						<MessageList
							messages={reviewMessages}
							isSending={isProcessingAIReview}
						/>
					</div>
					{/* Chat Input */}
					<div className="space-y-3 p-4">
						<div className="flex gap-2">
							<AsyncButton
								onClick={handleRequestReview}
								isLoading={isProcessingAIReview}
								disabled={!currentCode.trim() || isProcessingAIReview}
								icon={<SearchCode />}
							>
								Review now
							</AsyncButton>
							<Input
								placeholder="Ask AI something..."
								value={chatInput}
								onChange={(e) => setChatInput(e.target.value)}
								disabled={true}
								className="flex-1"
								onKeyDown={(e) => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault();
										handleSendMessage();
									}
								}}
							/>
							<Button
								onClick={handleSendMessage}
								disabled={true}
								size="icon"
								variant="outline"
							>
								<Send className="size-4" />
							</Button>
						</div>
					</div>
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
