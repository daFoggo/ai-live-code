"use client";
import { FileCode2, MessageCircleCode } from "lucide-react";
import Link from "next/link";
import PageHeading from "@/components/common/page-heading";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubmissionInfo } from "./submission-info";
import UserCode from "./user-code";

export const SubmissionDetail = () => {
	const storedExercise = JSON.parse(
		localStorage.getItem("storedExercise") || "null",
	);
	const { id, name } = storedExercise || {
		exerciseName: "Unknown Exercise",
		exerciseId: "unknown-id",
	};

	const CustomTitle = () => {
		return (
			<p className="font-semibold sm:font-bold text-lg sm:text-2xl">
				Your submission for{" "}
				<Link
					href={`/exercise/${id}`}
					className="text-primary hover:underline"
				>
					{name}
				</Link>
			</p>
		);
	};
	return (
		<div className="isolate relative flex flex-col gap-6 h-[calc(100dvh-var(--spacing)*16)] overflow-hidden">
			<PageHeading
				customTitleComponent={<CustomTitle />}
				className="px-2 sm:px-6 pt-2 sm:pt-6"
			/>
			<main className="isolate flex flex-col flex-1 w-full overflow-hidden">
				<div className="isolate relative flex flex-1 w-full overflow-hidden">
					{/* Desktop Layout */}
					<div className="hidden md:block px-6 pb-6 size-full">
						<ResizablePanelGroup
							direction="horizontal"
							className="isolate h-full"
						>
							{/* Code review */}
							<ResizablePanel defaultSize={65} minSize={35} maxSize={75}>
								<div className="isolate relative flex flex-col h-full">
									<SubmissionInfo />
								</div>
							</ResizablePanel>

							<ResizableHandle withHandle />

							{/* User code*/}
							<ResizablePanel
								defaultSize={35}
								minSize={25}
								maxSize={65}
								className="min-w-[max(30%,22rem)]"
							>
								<div className="flex flex-col h-full">
									<UserCode />
								</div>
							</ResizablePanel>
						</ResizablePanelGroup>
					</div>

					{/* Mobile Layout */}
					<div className="md:hidden flex-1 w-full h-full overflow-hidden">
						<Tabs defaultValue="feedback" className="h-full">
							<TabsList className="rounded-none w-full">
								<TabsTrigger value="feedback" className="flex-1">
									<MessageCircleCode className="mr-2 size-4" />
									Submission Info
								</TabsTrigger>
								<TabsTrigger value="your-code" className="flex-1">
									<FileCode2 className="mr-2 size-4" />
									Your Code
								</TabsTrigger>
							</TabsList>

							{/* Code review */}
							<TabsContent value="feedback" className="h-[calc(100%-4rem)]">
								<div className="flex flex-col h-full">
									<SubmissionInfo />
								</div>
							</TabsContent>

							{/* User code */}
							<TabsContent value="your-code" className="h-[calc(100%-4rem)]">
								<div className="flex flex-col h-full">
									<UserCode />
								</div>
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</main>
		</div>
	);
};
