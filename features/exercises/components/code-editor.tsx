"use client";

import type { editor } from "monaco-editor";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
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
import type { IStep } from "../utils/types";
import CodeEditorSettings from "./code-editor-settings";
import CodeReviewer from "./code-reviewer";
import StepInfo from "./step-info";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
	ssr: false,
});

type MonacoEditor = editor.IStandaloneCodeEditor;

interface ICodeEditorProps {
	stepsData: IStep[];
}
const CodeEditor = ({ stepsData }: ICodeEditorProps) => {
	const [language, setLanguage] = useState<string>(
		SUPPORTED_CODE_LANGUAGES[0].id,
	);
	const [code, setCode] = useState<string>(
		SUPPORTED_CODE_LANGUAGES[0].code_snippet || "",
	);
	const [currentStep, setCurrentStep] = useState<number>(0);

	const { settings } = useSettings();

	const handleChangeCodeLanguage = (id: string) => {
		const selectedLanguage = SUPPORTED_CODE_LANGUAGES.find(
			(lang) => lang.id === id,
		);
		if (selectedLanguage) {
			setLanguage(selectedLanguage.id);
			setCode(selectedLanguage.code_snippet || "");
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
						hasNewReview={false}
						isReviewing={false}
						reviewMessages={[]}
					/>
				</div>

				{settings.codeReview.mode === REVIEW_MODE.STEP_CODE &&
					settings.codeReview.showInstructions && (
						<StepInfo
							stepDatas={
								stepsData?.map((step) => ({ ...step, isCompleted: false })) ||
								[]
							}
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
					onChange={(val) => setCode(val ?? "")}
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
