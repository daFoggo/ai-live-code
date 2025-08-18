"use client";

import { DumbbellIcon as BicepsFlexed, Brain } from "lucide-react";
import { GeminiIcon } from "@/components/common/icons";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateId } from "@/lib/utils/id";
import { cn } from "@/lib/utils/tailwind";
import {
	getFlexibleCriteriaStatusConfig,
	getHardCriteriaStatusConfig,
} from "../../utils/functions";
import type {
	ICodeEvaluation,
	IEvaluation,
	IEvidence,
} from "../../utils/types";
import { ComplexityStatistic } from "./complexity-statistic";
import { CriteriaTooltip } from "./criteria-toolltip";
import { NumberedCard } from "./numbered-card";

interface IDetailSectionProps {
	hardCriteria: ICodeEvaluation["hardCriteria"];
	flexibleCriteria: ICodeEvaluation["flexibleCriteria"];
}
export const DetailSection = ({
	hardCriteria,
	flexibleCriteria,
}: IDetailSectionProps) => {
	const renderCriteriaItem = (
		title: string,
		evaluation: IEvaluation,
		isHard = true,
		criteriaNumber?: number,
		tooltip?: string,
	) => {
		const statusConfig = isHard
			? getHardCriteriaStatusConfig(evaluation?.status || "")
			: getFlexibleCriteriaStatusConfig(
					evaluation?.status || evaluation?.quality || "",
				);

		return (
			<div className="space-y-4 bg-card dark:bg-secondary p-4 border rounded-lg">
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-2">
						{criteriaNumber && (
							<Badge
								variant="outline"
								className="rounded-full size-6 font-bold text-xs"
							>
								{criteriaNumber}
							</Badge>
						)}
						<CriteriaTooltip title={title} description={tooltip}>
							<p className="font-medium text-sm">{title}</p>
						</CriteriaTooltip>
					</div>
					{evaluation?.status && (
						<Badge className={cn("text-xs", statusConfig.badgeColor)}>
							{statusConfig.icon}
							{evaluation.status}
						</Badge>
					)}
				</div>

				<ComplexityStatistic
					timeComplexity={evaluation?.timeComplexity}
					spaceComplexity={evaluation?.spaceComplexity}
				/>

				{/* Issues */}
				{evaluation?.issues && evaluation.issues.length > 0 && (
					<div className="space-y-2">
						<p className="font-medium text-red-600 dark:text-red-400 text-xs">
							Issues ({evaluation.issues.length})
						</p>
						<div className="flex flex-col gap-1 p-0.5 w-full">
							{evaluation.issues.map((issue: string, index: number) => (
								<NumberedCard
									key={generateId()}
									content={issue}
									index={index}
									keyPrefix="issue"
									className="bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
								/>
							))}
						</div>
					</div>
				)}

				{/* Evidence */}
				{evaluation?.evidence && evaluation.evidence.length > 0 && (
					<div className="space-y-2">
						<p className="font-medium text-primary text-xs">
							Evidence ({evaluation.evidence.length})
						</p>
						<div className="flex flex-col gap-1 p-0.5 w-full">
							{evaluation.evidence.map((evidence: IEvidence, index: number) => (
								<NumberedCard
									key={generateId()}
									content={evidence.description}
									codeLine={evidence.codeLine}
									index={index}
									keyPrefix="evidence"
									className="bg-primary/10 border-primary text-primary"
								/>
							))}
						</div>
					</div>
				)}

				{/* Syntax Errors */}
				{evaluation?.syntaxErrors && evaluation.syntaxErrors.length > 0 && (
					<div className="space-y-2">
						<p className="font-medium text-red-600 dark:text-red-400 text-xs">
							Syntax Errors ({evaluation.syntaxErrors.length})
						</p>
						<div className="flex flex-col gap-1 p-0.5 w-full">
							{evaluation.syntaxErrors.map((error: string, index: number) => (
								<NumberedCard
									key={generateId()}
									content={error}
									index={index}
									keyPrefix="syntax"
									className="bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
								/>
							))}
						</div>
					</div>
				)}
			</div>
		);
	};

	const renderReadabilitySubComponent = (
		title: string,
		component: { quality: string; issues: string[]; evidence: IEvidence[] },
		subNumber: string,
	) => {
		const statusConfig = getFlexibleCriteriaStatusConfig(component.quality);

		return (
			<div className="space-y-4 p-4 border rounded-lg">
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-2">
						<Badge
							variant="secondary"
							className="dark:bg-card rounded-full size-6 font-bold text-xs"
						>
							{subNumber}
						</Badge>
						<p className="font-medium text-sm">{title}</p>
					</div>
					<Badge className={cn("text-xs", statusConfig.badgeColor)}>
						{statusConfig.icon}
						{component.quality}
					</Badge>
				</div>

				{/* Issues */}
				{component.issues && component.issues.length > 0 && (
					<div className="space-y-2">
						<p className="font-medium text-red-600 dark:text-red-400 text-xs">
							Issues ({component.issues.length})
						</p>
						<div className="flex flex-col gap-1 p-0.5 w-full">
							{component.issues.map((issue: string, index: number) => (
								<NumberedCard
									key={generateId()}
									content={issue}
									index={index}
									keyPrefix={`${subNumber.replace(".", "-")}-issue`}
									className="bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
								/>
							))}
						</div>
					</div>
				)}

				{/* Evidence */}
				{component.evidence && component.evidence.length > 0 && (
					<div className="space-y-2">
						<p className="font-medium text-primary text-xs">
							Evidence ({component.evidence.length})
						</p>
						<div className="flex flex-col gap-1 p-0.5 w-full">
							{component.evidence.map((evidence: IEvidence, index: number) => (
								<NumberedCard
									key={generateId()}
									content={evidence.description}
									codeLine={evidence.codeLine}
									index={index}
									keyPrefix={`${subNumber.replace(".", "-")}-evidence`}
									className="bg-primary/10 border-primary text-primary"
								/>
							))}
						</div>
					</div>
				)}
			</div>
		);
	};

	const criteriaTooltips = {
		correctness:
			"Evaluates whether the code produces the expected output for all test cases",
		languageSpecifications:
			"Checks adherence to language-specific syntax, conventions, and best practices",
		compilabilityAndExecution:
			"Verifies that the code compiles without errors and runs successfully",
		complexityAndEfficiency:
			"Analyzes time and space complexity requirements and optimization",
		algorithmRequirements:
			"Ensures the implementation follows specified algorithmic approaches",
		submissionGuidelines:
			"Validates compliance with submission format and requirements",
		algorithmicSteps:
			"Evaluates the logical flow and step-by-step approach of the algorithm",
		algorithmDesignAndEfficiency:
			"Assesses the overall design choices and efficiency considerations",
		readabilityAndMaintainability:
			"Reviews code clarity, documentation, and maintainability factors",
		edgeCaseHandling:
			"Examines how well the code handles boundary conditions and edge cases",
	};

	return (
		<Card>
			<CardHeader className="flex justify-between items-center gap-4">
				<div className="flex items-center gap-2">
					<GeminiIcon className="size-4" />
					<CardTitle>Detail</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<Accordion type="multiple">
					<AccordionItem value="hard-criteria">
						<AccordionTrigger>
							<div className="flex items-center gap-2 font-medium text-sm">
								<BicepsFlexed className="size-4" />
								Objective Criteria
								<Badge className="bg-primary/30 rounded-full size-5 tabular-nums text-primary text-xs">
									{Object.keys(hardCriteria).length}
								</Badge>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-4 pt-2">
								{renderCriteriaItem(
									"Correctness",
									hardCriteria.correctness,
									true,
									1,
									criteriaTooltips.correctness,
								)}
								{renderCriteriaItem(
									"Language Specifications",
									hardCriteria.languageSpecifications,
									true,
									2,
									criteriaTooltips.languageSpecifications,
								)}
								{renderCriteriaItem(
									"Compilability & Execution",
									hardCriteria.compilabilityAndExecution,
									true,
									3,
									criteriaTooltips.compilabilityAndExecution,
								)}
								{renderCriteriaItem(
									"Complexity & Efficiency",
									hardCriteria.complexityAndEfficiency,
									true,
									4,
									criteriaTooltips.complexityAndEfficiency,
								)}
								{renderCriteriaItem(
									"Algorithm Requirements",
									hardCriteria.algorithmRequirements,
									true,
									5,
									criteriaTooltips.algorithmRequirements,
								)}
								{renderCriteriaItem(
									"Submission Guidelines",
									hardCriteria.submissionGuidelines,
									true,
									6,
									criteriaTooltips.submissionGuidelines,
								)}
							</div>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="flexible-criteria">
						<AccordionTrigger>
							<div className="flex items-center gap-2 font-medium text-sm">
								<Brain className="size-4" />
								Subjective Criteria
								<Badge className="bg-primary/30 rounded-full size-5 tabular-nums text-primary text-xs">
									{Object.keys(flexibleCriteria).length}
								</Badge>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<div className="space-y-4 pt-2">
								{renderCriteriaItem(
									"Algorithmic Steps",
									flexibleCriteria.algorithmicSteps,
									false,
									1,
									criteriaTooltips.algorithmicSteps,
								)}

								{renderCriteriaItem(
									"Algorithm Design & Efficiency",
									flexibleCriteria.algorithmDesignAndEfficiency,
									false,
									2,
									criteriaTooltips.algorithmDesignAndEfficiency,
								)}

								<div className="space-y-4 bg-card dark:bg-secondary p-4 border rounded-lg">
									<div className="flex justify-between items-center">
										<div className="flex items-center gap-2">
											<Badge
												variant="outline"
												className="rounded-full size-6 font-bold text-xs"
											>
												3
											</Badge>
											<CriteriaTooltip
												title="Readability & Maintainability"
												description={
													criteriaTooltips.readabilityAndMaintainability
												}
											>
												<p className="font-medium text-sm">
													Readability & Maintainability
												</p>
											</CriteriaTooltip>
										</div>
										{flexibleCriteria.readabilityAndMaintainability
											?.overall && (
											<Badge
												className={cn(
													"text-xs",
													getFlexibleCriteriaStatusConfig(
														flexibleCriteria.readabilityAndMaintainability
															.overall,
													).badgeColor,
												)}
											>
												{
													getFlexibleCriteriaStatusConfig(
														flexibleCriteria.readabilityAndMaintainability
															.overall,
													).icon
												}
												{flexibleCriteria.readabilityAndMaintainability.overall}
											</Badge>
										)}
									</div>

									<div className="gap-4 grid grid-cols-1 sm:grid-cols-3 pl-4">
										{flexibleCriteria.readabilityAndMaintainability
											?.codeComments &&
											renderReadabilitySubComponent(
												"Code Comments",
												flexibleCriteria.readabilityAndMaintainability
													.codeComments,
												"3.1",
											)}

										{flexibleCriteria.readabilityAndMaintainability
											?.modularity &&
											renderReadabilitySubComponent(
												"Modularity",
												flexibleCriteria.readabilityAndMaintainability
													.modularity,
												"3.2",
											)}

										{flexibleCriteria.readabilityAndMaintainability
											?.codingStyle &&
											renderReadabilitySubComponent(
												"Coding Style",
												flexibleCriteria.readabilityAndMaintainability
													.codingStyle,
												"3.3",
											)}
									</div>
								</div>

								{renderCriteriaItem(
									"Edge Case Handling",
									flexibleCriteria.edgeCaseHandling,
									false,
									4,
									criteriaTooltips.edgeCaseHandling,
								)}
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</CardContent>
		</Card>
	);
};
