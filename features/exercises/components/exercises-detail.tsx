"use client";

import { BadgeQuestionMark, FileCode2, MessageSquareCode } from "lucide-react";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExerciseDetailHeader } from "./exercise-detail-header";

export const ExerciseDetail = () => {
	return (
		<div className="isolate relative flex flex-col h-svh overflow-hidden">
			<ExerciseDetailHeader />
			<main className="isolate flex flex-col flex-1 w-full overflow-hidden">
				<div className="isolate relative flex flex-1 w-full overflow-hidden">
					{/* Desktop Layout */}
					<div className="hidden md:block p-3 sm:p-6 size-full">
						<ResizablePanelGroup
							direction="horizontal"
							className="isolate h-full"
						>
							{/* Left: Problem */}
							<ResizablePanel
								defaultSize={25}
								minSize={15}
								maxSize={35}
								className="min-w-[max(20%,22rem)]"
							>
								<div className="isolate relative flex flex-col h-full">
									left section
								</div>
							</ResizablePanel>

							<ResizableHandle withHandle />

							{/* Center: Code Editor */}
							<ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
								<div className="flex flex-col h-full">center section</div>
							</ResizablePanel>

							<ResizableHandle withHandle />

							{/* Right: Chat */}
							<ResizablePanel
								defaultSize={25}
								minSize={15}
								maxSize={35}
								className="min-w-[max(20%,20rem)]"
							>
								<div className="flex flex-col h-full">right section</div>
							</ResizablePanel>
						</ResizablePanelGroup>
					</div>

					{/* Mobile Layout */}
					<div className="md:hidden flex-1 w-full h-full overflow-hidden">
						<Tabs defaultValue="problem" className="h-full">
							<TabsList className="rounded-none w-full">
								<TabsTrigger value="problem" className="flex-1">
									<BadgeQuestionMark className="mr-2 size-4" />
									Problem
								</TabsTrigger>
								<TabsTrigger value="editor" className="flex-1">
									<FileCode2 className="mr-2 size-4" />
									Editor
								</TabsTrigger>
								<TabsTrigger value="review" className="flex-1">
									<MessageSquareCode className="mr-2 size-4" />
									Review
								</TabsTrigger>
							</TabsList>

							{/*  Problem */}
							<TabsContent value="problem" className="mt-0 h-[calc(100%-4rem)]">
								<div className="flex flex-col h-full">left section</div>
							</TabsContent>

							{/* Editor */}
							<TabsContent value="editor" className="mt-0 h-[calc(100%-4rem)]">
								<div className="flex flex-col h-full">center section</div>
							</TabsContent>

							{/* Review */}
							<TabsContent value="review" className="mt-0 h-[calc(100%-4rem)]">
								<div className="flex flex-col h-full">right section</div>
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</main>
		</div>
	);
};
