"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MarkdownKatexRenderer } from "@/components/common/markdown-katex-renderer";
import { Scroller } from "@/components/ui/scroller";
import { cn } from "@/lib/utils/tailwind";
import type { IStep } from "../utils/types";

export interface IStepWithStatus extends IStep {
	isCompleted: boolean;
}

interface IStepInfoProps {
	stepDatas: IStepWithStatus[];
	currentStep?: number;
	onStepClick?: (stepIndex: number) => void;
}

export default function StepInfo({
	stepDatas,
	currentStep = 0,
	onStepClick,
}: IStepInfoProps) {
	const listRef = useRef<HTMLDivElement>(null);
	const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
	const [isStepsExpanded, setIsStepsExpanded] = useState(false);

	useEffect(() => {
		const el = itemRefs.current[currentStep];
		if (el && listRef.current) {
			el.scrollIntoView({ behavior: "smooth", block: "nearest" });
		}
	}, [currentStep]);

	const handleStepChange = (index: number) => {
		onStepClick?.(index);
		const el = itemRefs.current[index];
		if (el && listRef.current) {
			el.scrollIntoView({ behavior: "smooth", block: "nearest" });
		}

		if (window.innerWidth < 768) {
			setIsStepsExpanded(false);
		}
	};

	const currentStepData = stepDatas[currentStep];

	return (
		<>
			{/* Mobile Layout */}
			<div className="md:hidden">
				<div className="bg-background mb-2 border rounded-lg">
					<button
						type="button"
						onClick={() => setIsStepsExpanded(!isStepsExpanded)}
						className="p-4 w-full text-left"
					>
						<div className="flex justify-between items-center">
							<div className="flex flex-1 items-center gap-3 min-w-0">
								<div
									className={cn(
										"inline-flex justify-center items-center rounded-full w-7 h-7 font-medium text-xs shrink-0",
										currentStepData?.isCompleted
											? "bg-secondary text-secondary-foreground"
											: "bg-primary text-primary-foreground",
									)}
								>
									{currentStepData?.isCompleted ? (
										<Check className="size-4" />
									) : (
										currentStep + 1
									)}
								</div>
								<div className="flex-1 min-w-0">
									<div className="font-medium text-foreground text-sm">
										{currentStepData?.title || "No title provided"}
									</div>
								</div>
							</div>
							<ChevronDown
								className={cn(
									"size-4 text-muted-foreground transition-transform shrink-0",
									isStepsExpanded && "rotate-180",
								)}
							/>
						</div>
					</button>

					{isStepsExpanded && (
						<div className="bg-muted/30 border-t">
							<div className="max-h-48 overflow-y-auto">
								<div className="space-y-1 p-2">
									{stepDatas.map((step, index) => {
										const isActive = index === currentStep;
										const isDone = step.isCompleted;
										return (
											<button
												key={`step-${index}-${step.title}`}
												ref={(el) => {
													itemRefs.current[index] = el;
												}}
												type="button"
												onClick={() => handleStepChange(index)}
												className={cn(
													"group px-3 py-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring w-full text-left transition-colors",
													isActive
														? "bg-background border border-primary/30 shadow-sm"
														: "hover:bg-background/50",
												)}
											>
												<div className="flex items-center gap-3">
													<div
														className={cn(
															"inline-flex justify-center items-center rounded-full w-6 h-6 font-medium text-xs shrink-0",
															isDone
																? "bg-secondary text-secondary-foreground"
																: isActive
																	? "bg-primary text-primary-foreground"
																	: "bg-muted-foreground/20 text-muted-foreground",
														)}
													>
														{isDone ? <Check className="w-3 h-3" /> : index + 1}
													</div>
													<div className="flex-1 min-w-0">
														<div
															className={cn(
																"font-medium text-sm",
																isActive
																	? "text-foreground"
																	: "text-foreground/80",
															)}
														>
															{step.title}
														</div>
													</div>
												</div>
											</button>
										);
									})}
								</div>
							</div>
						</div>
					)}
				</div>


				<div className="bg-background border rounded-lg">
					<Scroller className="max-h-40">
						<div className="p-4">
							<div className="text-muted-foreground text-sm leading-relaxed">
								{currentStepData ? (
									<MarkdownKatexRenderer
										content={currentStepData.description}
									/>
								) : (
									<p>No instruction was provided for this step.</p>
								)}
							</div>
						</div>
					</Scroller>
				</div>
			</div>

			{/* Desktop Layout */}
			<div className="hidden md:flex bg-background border rounded-lg h-28 overflow-hidden">
				<div className="flex flex-col bg-muted border-r md:w-1/2 lg:w-2/5">
					<Scroller className="flex-1 h-full">
						<div ref={listRef} className="space-y-1 p-3">
							{stepDatas.map((step, index) => {
								const isActive = index === currentStep;
								const isDone = step.isCompleted;
								return (
									<button
										key={`step-${index}-${step.title}`}
										ref={(el) => {
											itemRefs.current[index] = el;
										}}
										type="button"
										onClick={() => handleStepChange(index)}
										className={cn(
											"group px-3 py-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring w-full text-left transition-colors",
											isActive
												? "bg-background/80 border border-primary/30 shadow-sm"
												: "hover:bg-background/50",
										)}
										aria-current={isActive ? "step" : undefined}
									>
										<div className="flex items-start gap-3">
											<div
												className={cn(
													"inline-flex justify-center items-center mt-0.5 rounded-full w-6 h-6 font-medium text-[11px] shrink-0",
													isDone
														? "bg-secondary text-secondary-foreground"
														: isActive
															? "bg-primary text-primary-foreground"
															: "bg-muted-foreground/20 text-muted-foreground",
												)}
												aria-hidden="true"
											>
												{isDone ? <Check className="size-4" /> : index + 1}
											</div>
											<div className="min-w-0">
												<div
													className={cn(
														"font-medium text-sm",
														isActive ? "text-foreground" : "text-foreground/80",
														"lg:line-clamp-2 md:truncate",
													)}
													title={step.title}
												>
													{step.title}
												</div>
											</div>
										</div>
									</button>
								);
							})}
						</div>
					</Scroller>
				</div>

				<div className="flex flex-col flex-1">
					<Scroller className="flex-1 h-full">
						<div className="p-4">
							<div className="text-muted-foreground text-sm leading-relaxed">
								{currentStepData ? (
									<MarkdownKatexRenderer
										content={currentStepData.description}
									/>
								) : (
									<p>No instruction was provided for this step.</p>
								)}
							</div>
						</div>
					</Scroller>
				</div>
			</div>
		</>
	);
}
