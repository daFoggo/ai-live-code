"use client";

import { BadgeQuestionMark, FileCode2 } from "lucide-react";
import { useParams } from "next/navigation";
import ErrorAlert from "@/components/common/error-alert";
import { PageLoading } from "@/components/common/page-loading";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeEditorSettingsProvider } from "../contexts/code-editor-settings-context";
import { useExerciseDetailSWR } from "../hooks/use-exercises-detail-swr";
import CodeEditor from "./code-editor";
import { ExerciseDetailHeader } from "./exercise-detail-header";
import ExerciseInfo from "./exercise-info";

export const ExerciseDetail = () => {
	const { id } = useParams<{ id: string }>();
	const { exerciseDetail, isLoadingExerciseDetail, exerciseDetailError } =
		useExerciseDetailSWR(id);

	if (isLoadingExerciseDetail) {
		return (
			<PageLoading variant="terminal" text="Loading exercise details..." />
		);
	}

	if (exerciseDetailError || !exerciseDetail) {
		return (
			<ErrorAlert
				title="Error loading exercise details"
				description={"No exercise details available. Please try again"}
			/>
		);
	}

	return (
		<CodeEditorSettingsProvider>
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
								<ResizablePanel
									defaultSize={35}
									minSize={25}
									maxSize={65}
									className="min-w-[max(30%,22rem)]"
								>
									<div className="isolate relative flex flex-col h-full">
										<ExerciseInfo exerciseData={exerciseDetail} />
									</div>
								</ResizablePanel>

								<ResizableHandle withHandle />

								<ResizablePanel defaultSize={65} minSize={35} maxSize={75}>
									<div className="flex flex-col h-full">
										<CodeEditor stepsData={exerciseDetail.steps || []} exerciseData={exerciseDetail} />
									</div>
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
								</TabsList>

								{/* Problem */}
								<TabsContent
									value="problem"
									className="mt-0 h-[calc(100%-4rem)]"
								>
									<div className="flex flex-col h-full">
										<ExerciseInfo exerciseData={exerciseDetail} />
									</div>
								</TabsContent>

								{/* Editor */}
								<TabsContent
									value="editor"
									className="mt-0 h-[calc(100%-4rem)]"
								>
									<div className="flex flex-col h-full">
										<CodeEditor stepsData={exerciseDetail.steps || []} exerciseData={exerciseDetail} />
									</div>
								</TabsContent>
							</Tabs>
						</div>
					</div>
				</main>
			</div>
		</CodeEditorSettingsProvider>
	);
};
