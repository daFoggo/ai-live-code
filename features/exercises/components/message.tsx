/** biome-ignore-all lint/a11y/noStaticElementInteractions: <> */

import { Bot, Clock, Copy, User } from "lucide-react";
import { memo, useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { MarkdownKatexRenderer } from "@/components/common/markdown-katex-renderer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind";
import type { IMessage } from "../utils/types";

const MessageAvatar = memo(({ sender }: { sender: "ai" | "user" }) => (
	<div className="flex-shrink-0">
		<Avatar className="size-8">
			{sender === "user" ? (
				<AvatarFallback className="bg-primary text-primary-foreground">
					<User className="size-4" />
				</AvatarFallback>
			) : (
				<AvatarFallback className="bg-primary text-primary-foreground">
					<Bot className="size-4" />
				</AvatarFallback>
			)}
		</Avatar>
	</div>
));

MessageAvatar.displayName = "MessageAvatar";

const MessageHeader = memo(
	({ sender, timestamp }: { sender: "ai" | "user"; timestamp: string }) => {
		const formattedTime = useMemo(() => {
			try {
				const date = new Date(timestamp);
				return date.toLocaleTimeString("vi-VN", {
					hour: "2-digit",
					minute: "2-digit",
				});
			} catch (error) {
				console.error("Failed to format timestamp:", error);
				return timestamp;
			}
		}, [timestamp]);

		return (
			<div className="flex items-center gap-2 text-muted-foreground text-xs">
				<span className="font-semibold">
					{sender === "user" ? "You" : "AI"}
				</span>
				<span>•</span>
				<div className="flex items-center gap-1">
					<Clock className="size-3" />
					<span className="font-medium">{formattedTime}</span>
				</div>
			</div>
		);
	},
);

MessageHeader.displayName = "MessageHeader";

const MessageContent = memo(({ content }: { content: string }) => (
	<MarkdownKatexRenderer content={content} className="text-sm" />
));

MessageContent.displayName = "MessageContent";

const MessageToolbar = memo(
	({ isVisible, onCopy }: { isVisible: boolean; onCopy: () => void }) => {
		return (
			<div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 h-7 transition-opacity">
				{isVisible && (
					<Button
						variant="ghost"
						size="sm"
						onClick={onCopy}
						className="px-2 h-7"
					>
						<Copy className="mr-1 size-3" />
						Copy
					</Button>
				)}
			</div>
		);
	},
);

MessageToolbar.displayName = "MessageToolbar";

const Message = memo(({ message }: { message: IMessage }) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = useCallback(() => setIsHovered(true), []);
	const handleMouseLeave = useCallback(() => setIsHovered(false), []);

	const handleCopy = useCallback(() => {
		try {
			navigator.clipboard.writeText(message.feedback);
			toast.success("Đã sao chép nội dung tin nhắn");
		} catch (error) {
			console.error("Failed to copy message content:", error);
			toast.error("Không thể sao chép nội dung tin nhắn");
		}
	}, [message.feedback]);

	const containerClassName = useMemo(
		() =>
			cn(
				"group flex justify-center items-start p-4 border-b border-border/50 transition-colors",
				message.metadata.sender === "user"
					? "bg-background hover:bg-muted/20"
					: "bg-muted/30 hover:bg-muted/50",
			),
		[message.metadata.sender],
	);

	return (
		<div
			className={containerClassName}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className="flex gap-2 w-full max-w-4xl">
				<MessageAvatar sender={message.metadata.sender} />

				<div className="flex-1 min-w-0">
					<div className="space-y-4">
						<MessageHeader
							sender={message.metadata.sender}
							timestamp={message.metadata.timestamp}
						/>

						<MessageContent content={message.feedback} />

						<MessageToolbar isVisible={isHovered} onCopy={handleCopy} />
					</div>
				</div>
			</div>
		</div>
	);
});

Message.displayName = "Message";

export default Message;
