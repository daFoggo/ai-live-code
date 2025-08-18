"use client";

import type { editor } from "monaco-editor";
import dynamic from "next/dynamic";
import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
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
import { SUPPORTED_CODE_LANGUAGES } from "../utils/constants";
import type { IExercise } from "../utils/types";
import CodeEditorSettings from "./code-editor-settings";
import CodeReviewer from "./code-reviewer";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
	ssr: false,
});

type MonacoEditor = editor.IStandaloneCodeEditor;

export interface ICodeEditorRef {
	getCurrentCode: () => string;
	getCurrentLanguage: () => string;
	setCode: (code: string) => void;
	resetToDefault: () => void;
}

interface ICodeEditorProps {
	exerciseData?: IExercise;
}

const CodeEditor = forwardRef<ICodeEditorRef, ICodeEditorProps>(
	({ exerciseData }, ref) => {
		const [language, setLanguage] = useState<string>(
			SUPPORTED_CODE_LANGUAGES[0].id,
		);
		const [code, setCode] = useState<string>(
			SUPPORTED_CODE_LANGUAGES[0].code_snippet || "",
		);
		const [shouldRequestReviewNow, setShouldRequestReviewNow] =
			useState<boolean>(false);

		const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
		const editorRef = useRef<MonacoEditor | null>(null);

		useImperativeHandle(
			ref,
			() => ({
				getCurrentCode: () => {
					return editorRef.current?.getValue() || code;
				},
				getCurrentLanguage: () => {
					return language;
				},
				setCode: (newCode: string) => {
					setCode(newCode);
					editorRef.current?.setValue(newCode);
				},
				resetToDefault: () => {
					const defaultLang = SUPPORTED_CODE_LANGUAGES[0];
					setLanguage(defaultLang.id);
					const defaultCode = defaultLang.code_snippet || "";
					setCode(defaultCode);
					editorRef.current?.setValue(defaultCode);
				},
			}), 
			[language, code],
		);

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

		const handleChangeCodeLanguage = (id: string) => {
			const selectedLanguage = SUPPORTED_CODE_LANGUAGES.find(
				(lang) => lang.id === id,
			);
			if (selectedLanguage) {
				setLanguage(selectedLanguage.id);
				setCode(selectedLanguage.code_snippet || "");
			}
		};

		const handleEditorDidMount = (editor: MonacoEditor) => {
			editorRef.current = editor;
		};

		return (
			<Card className="flex flex-col mx-3 sm:my-0 mt-2 sm:mr-0 mb-3 sm:ml-6 h-full">
				<CardHeader className="flex justify-between items-center gap-4 w-full">
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

					<CodeReviewer
						currentCode={code}
						exerciseData={exerciseData}
						shouldRequestReviewNow={shouldRequestReviewNow}
					/>
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
	},
);

CodeEditor.displayName = "CodeEditor";

export default CodeEditor;
