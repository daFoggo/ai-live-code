"use client";

import dynamic from "next/dynamic";
import { Loader } from "@/components/common/loaders";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ICodeLanguage } from "@/features/exercises";
import { SAMPLE_USER_CODE } from "../utils/data";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
	ssr: false,
});

// type MonacoEditor = editor.IStandaloneCodeEditor;

const UserCode = () => {
	const codeLanguage: ICodeLanguage = {
		id: "python",
		name: "Python",
		code_snippet: "",
	};
	return (
		<Card className="flex flex-col mx-3 sm:my-0 mt-2 sm:mr-0 mb-3 sm:ml-6 h-full">
			<CardHeader className="flex justify-between items-center gap-4">
				<CardTitle>Your code</CardTitle>
				<Badge>{codeLanguage.name}</Badge>
			</CardHeader>

			<CardContent className="flex flex-col flex-1 gap-2 p-0 min-h-0">
				<MonacoEditor
					height="100%"
					width="100%"
					language="python"
					value={SAMPLE_USER_CODE}
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
						readOnly: true,
					}}
					theme="vs-dark"
					loading={<Loader variant="dots" text="Loading editor..." />}
				/>
			</CardContent>
		</Card>
	);
};

export default UserCode;
