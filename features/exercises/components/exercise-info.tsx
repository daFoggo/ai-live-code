"use client";

import {
	BookMarked,
	ChevronLeft,
	ChevronRight,
	History,
	LetterText,
	RotateCcw,
} from "lucide-react";
import { AsyncButton } from "@/components/common/async-button";
import { MarkdownKatexRenderer } from "@/components/common/markdown-katex-renderer";
import { defineStepper } from "@/components/stepper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Scroller } from "@/components/ui/scroller";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { IExercise, IStep } from "../utils/types";

interface IExerciseInfoProps {
	exerciseData: IExercise;
}
const ExerciseInfo = ({ exerciseData }: IExerciseInfoProps) => {
	return (
		<Card className="mx-3 sm:my-0 mt-2 sm:mr-6 mb-3 sm:ml-0 h-full">
			<Tabs defaultValue="description">
				<CardHeader>
					<Scroller>
						<TabsList>
							<TabsTrigger value="description">
								<LetterText />
								Description
							</TabsTrigger>
							<TabsTrigger value="instructions">
								<BookMarked />
								Instructions
							</TabsTrigger>
							<TabsTrigger value="submissions">
								<History />
								Submissions
							</TabsTrigger>
						</TabsList>
					</Scroller>
				</CardHeader>
				<CardContent className="flex-1 h-full">
					<TabsContent value="description">
						<Scroller
							className="h-auto max-h-[36rem] sm:max-h-[38rem]"
							withNavigation
							hideScrollbar
						>
							<p className="mb-2 font-semibold text-primary text-2xl">
								{exerciseData.name}
							</p>
							<MarkdownKatexRenderer content={exerciseData.description} />
						</Scroller>
					</TabsContent>

					<TabsContent value="instructions">
						<Scroller
							className="h-auto max-h-[36rem] sm:max-h-[38rem]"
							withNavigation
							hideScrollbar
						>
							<ExerciseInstructions steps={exerciseData.steps || []} />
						</Scroller>
					</TabsContent>

					<TabsContent value="submissions">
						<Scroller
							className="h-auto max-h-[36rem] sm:max-h-[38rem]"
							withNavigation
							hideScrollbar
						>
							Feature not implemented yet (•_•)
						</Scroller>
					</TabsContent>
				</CardContent>
			</Tabs>
		</Card>
	);
};

export default ExerciseInfo;

const ExerciseInstructions = ({ steps }: { steps: IStep[] }) => {
	const convertedSteps = steps.map((step) => {
		return {
			id: step.step_number.toString(),
			title: step.title,
			content: step.explanation,
		};
	});

	const { Stepper } = defineStepper(...convertedSteps);

	return (
		<Stepper.Provider className="space-y-4" variant="vertical" tracking={true}>
			{({ methods }) => (
				<>
					<Stepper.Navigation>
						{methods.all.map((step) => (
							<Stepper.Step
								key={step.id}
								of={step.id}
								onClick={() => methods.goTo(step.id)}
							>
								<Stepper.Title>{step.title}</Stepper.Title>
								{methods.when(step.id, () => (
									<Stepper.Panel className="space-y-4">
										<Card className="bg-secondary p-2 text-sm">
											<MarkdownKatexRenderer content={step.content} />
										</Card>
										<Stepper.Controls>
											{!methods.isLast && (
												<AsyncButton
													variant="secondary"
													onClick={methods.prev}
													disabled={methods.isFirst}
													size="sm"
													icon={<ChevronLeft />}
												>
													Previous
												</AsyncButton>
											)}
											<AsyncButton
												onClick={methods.isLast ? methods.reset : methods.next}
												size="sm"
												icon={methods.isLast ? <RotateCcw /> : <ChevronRight />}
												iconPosition="right"
											>
												{methods.isLast ? "Reset" : "Next"}
											</AsyncButton>
										</Stepper.Controls>
									</Stepper.Panel>
								))}
							</Stepper.Step>
						))}
					</Stepper.Navigation>
				</>
			)}
		</Stepper.Provider>
	);
};
