import type { EXERCISE_LEVEL, REVIEW_MODE } from "./constants";

export interface IExercise {
  id: string;
  name: string;
  statement: string;
  level: EXERCISE_LEVEL;
  function_signature?: string;
  testcases: ITestCase[];
  steps?: IStep[];
  example_code?: string;
}

export interface ITestCase {
  id: string;
  input: string;
  output: string;
  isPublic: boolean;
}

export interface IStep {
  title: string;
  description: string;
  code: string;
}

export interface ICodeLanguage {
  id: string;
  name: string;
  code_snippet?: string;
}

export interface ICodeEditorSettings {
  codeReview: {
    mode: REVIEW_MODE;
    showInstructions: boolean;
  };
}
