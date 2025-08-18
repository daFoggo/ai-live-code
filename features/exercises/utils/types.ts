import type { REVIEW_MODE, STEP_STATUS } from "./constants";

export interface IExercise {
  problem_id: string;
  name: string;
  description: string;
  difficulty: number;
  code_template?: string;
  guidelines?: string;
  solution?: string;
  public_test_path?: string;
  hidden_test_path?: string;
  steps?: IStep[];
  clos?: string[];

  time_limit_ms: number;
  memory_limit_mb: number;

  isDone?: boolean;
}

export interface ITestCase {
  id: string;
  input: string;
  output: string;
  isPublic: boolean;
}

export interface IStep {
  step_id: string;
  step_number: number;
  title: string;
  explanation: string;
  solution: string;
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

export interface IMessage {
  feedback: string;
  stepStatus?: STEP_STATUS.PASSED | STEP_STATUS.NOT_PASSED;
  metadata: {
    messageId: string;
    timestamp: string;
    sender: "ai" | "user";
    type: "response" | "question";
  };
}
