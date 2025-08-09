import { MessageCircleDashed } from "lucide-react";
import { lazy, memo, useCallback, useEffect, useMemo, useRef } from "react";
import EmptyData from "@/components/common/empty-data";
import { Scroller } from "@/components/ui/scroller";
import { cn } from "@/lib/utils/tailwind";
import type { IMessage } from "../utils/types";

const LoadingMessage = lazy(() => import("./loading-message"));
const Message = lazy(() => import("./message"));

const MessageList = memo(
	({
		messages,
		isSending = false,
		className,
	}: {
		messages: IMessage[];
		isSending?: boolean;
		className?: string;
	}) => {
		const scrollAreaRef = useRef<HTMLDivElement>(null);
		const messagesEndRef = useRef<HTMLDivElement>(null);

		const scrollToBottom = useCallback(() => {
			requestAnimationFrame(() => {
				if (scrollAreaRef.current) {
					const scrollContainer =
						scrollAreaRef.current.querySelector(
							"[data-radix-scroll-area-viewport]",
						) || scrollAreaRef.current;
					scrollContainer.scrollTo({
						top: scrollContainer.scrollHeight,
						behavior: "smooth",
					});
				}
			});
		}, []);

		const messagesList = useMemo(() => {
			return messages.map((message, index) => (
				<Message
					key={`${message.metadata.messageId}-${index}`}
					message={message}
				/>
			));
		}, [messages]);

		useEffect(() => {
			if (messages.length > 0 || isSending) {
				scrollToBottom();
			}
		}, [messages.length, isSending, scrollToBottom]);

		if (messages.length === 0 && !isSending) {
			return (
				<EmptyData
					icon={(className) => <MessageCircleDashed className={className} />}
					message="No reviews available. Start coding to receive feedback."
				/>
			);
		}

		return (
			<Scroller
				ref={scrollAreaRef}
				className={cn("flex-1", className)}
				style={{ maxHeight: "100%" }}
			>
				<div className="min-h-full">
					{messagesList}
					{isSending && (
						<div className="flex-shrink-0">
							<LoadingMessage />
						</div>
					)}
					<div ref={messagesEndRef} />
				</div>
			</Scroller>
		);
	},
);

MessageList.displayName = "MessageList";

export default MessageList;
