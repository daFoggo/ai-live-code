"use client";

import type { editor } from "monaco-editor";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { Loader } from "@/components/common/loaders";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useSettings } from "../contexts/code-editor-settings-context";
import { REVIEW_MODE, SUPPORTED_CODE_LANGUAGES } from "../utils/constants";
import type { IExercise, IStep } from "../utils/types";
import CodeEditorSettings from "./code-editor-settings";
import CodeReviewer from "./code-reviewer";
import StepInfo, { type IStepWithStatus } from "./step-info";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
	ssr: false,
});

type MonacoEditor = editor.IStandaloneCodeEditor;

interface ICodeEditorProps {
	stepsData: IStep[];
	exerciseData?: IExercise;
}

const CodeEditor = ({ stepsData, exerciseData }: ICodeEditorProps) => {
	const [language, setLanguage] = useState<string>(
		SUPPORTED_CODE_LANGUAGES[0].id,
	);
	const [code, setCode] = useState<string>(
		SUPPORTED_CODE_LANGUAGES[0].code_snippet || "",
	);
	const [currentStep, setCurrentStep] = useState<number>(0);
	const [shouldRequestReviewNow, setShouldRequestReviewNow] =
		useState<boolean>(false);
	const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

	const { settings } = useSettings();

	const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

	// auto review when code change and 30s non touch
	const handleCodeChange = (newCode: string | undefined) => {
		setCode(newCode ?? "");

		if (debounceTimerRef.current) {
			clearTimeout(debounceTimerRef.current);
		}

		setShouldRequestReviewNow(false);

		debounceTimerRef.current = setTimeout(() => {
			setShouldRequestReviewNow(true);
		}, 30000);
	};

	useEffect(() => {
		return () => {
			if (debounceTimerRef.current) {
				clearTimeout(debounceTimerRef.current);
			}
		};
	}, []);

	useEffect(() => {
		if (shouldRequestReviewNow) {
			const resetTimer = setTimeout(() => {
				setShouldRequestReviewNow(false);
			}, 1000);

			return () => clearTimeout(resetTimer);
		}
	}, [shouldRequestReviewNow]);

	const exampleCode = useMemo(() => {
		if (settings.codeReview.mode === REVIEW_MODE.STEP_CODE) {
			return stepsData[currentStep]?.code || "";
		} else {
			return exerciseData?.example_code || "";
		}
	}, [settings.codeReview.mode, stepsData, currentStep, exerciseData]);

	const stepDescription = useMemo(() => {
		if (settings.codeReview.mode === REVIEW_MODE.STEP_CODE) {
			return stepsData[currentStep]?.description || "";
		}
		return "";
	}, [settings.codeReview.mode, stepsData, currentStep]);

	const stepsWithStatus = useMemo((): IStepWithStatus[] => {
		return stepsData.map((step, index) => ({
			...step,
			isCompleted: completedSteps.has(index),
		}));
	}, [stepsData, completedSteps]);

	const handleChangeCodeLanguage = (id: string) => {
		const selectedLanguage = SUPPORTED_CODE_LANGUAGES.find(
			(lang) => lang.id === id,
		);
		if (selectedLanguage) {
			setLanguage(selectedLanguage.id);
			setCode(selectedLanguage.code_snippet || "");
		}
	};

	const handleStepCompleted = (stepIndex: number) => {
		setCompletedSteps((prev) => new Set(prev).add(stepIndex));

		// Auto advance to next step if available
		if (stepIndex === currentStep && stepIndex < stepsData.length - 1) {
			setCurrentStep(stepIndex + 1);
		}
	};

	const editorRef = useRef<MonacoEditor | null>(null);
	const handleEditorDidMount = (editor: MonacoEditor) => {
		editorRef.current = editor;
	};

	return (
		<Card className="flex flex-col mx-3 mb-2 sm:mb-0 h-full">
			<CardHeader className="gap-4">
				<div className="flex justify-between items-center gap-2">
					{/*Tool bar*/}
					<div className="flex items-center gap-2">
						<Select
							value={language}
							onValueChange={handleChangeCodeLanguage}
							defaultValue="python"
						>
							<SelectTrigger>
								<SelectValue placeholder="Select language" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Supported languages</SelectLabel>
									{SUPPORTED_CODE_LANGUAGES.map((lang) => (
										<SelectItem key={lang.id} value={lang.id}>
											{lang.name}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
						<CodeEditorSettings />
					</div>

					{/* Chatbot */}
					<CodeReviewer
						currentCode={code}
						exerciseData={exerciseData}
						exampleCode={exampleCode}
						stepDescription={stepDescription}
						shouldRequestReviewNow={shouldRequestReviewNow}
						currentStep={currentStep}
						onStepCompleted={handleStepCompleted}
					/>
				</div>

				{settings.codeReview.mode === REVIEW_MODE.STEP_CODE &&
					settings.codeReview.showInstructions && (
						<StepInfo
							stepDatas={stepsWithStatus}
							currentStep={currentStep}
							onStepClick={setCurrentStep}
						/>
					)}
			</CardHeader>

			<CardContent className="flex flex-col flex-1 gap-2 p-0 min-h-0">
				<MonacoEditor
					height="100%"
					width="100%"
					language={language === "python" ? "python" : language}
					value={code}
					onChange={handleCodeChange}
					onMount={handleEditorDidMount}
					options={{
						fontSize: 14,
						fontLigatures: true,
						minimap: { enabled: false },
						tabSize: 2,
						detectIndentation: true,
						renderWhitespace: "selection",
						wordWrap: "on",
						scrollbar: { alwaysConsumeMouseWheel: false },
						renderValidationDecorations: "on",
					}}
					theme="vs-dark"
					loading={<Loader variant="dots" text="Loading editor..." />}
				/>
			</CardContent>
		</Card>
	);
};

export default CodeEditor;
