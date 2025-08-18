import type { ICodeEditorSettings, ICodeLanguage } from "./types";

export enum EXERCISE_LEVEL {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
}

export enum REVIEW_MODE {
  FULL_CODE = 0,
  STEP_CODE = 1,
}

export enum STEP_STATUS {
  NOT_PASSED = 0,
  PASSED = 1,
}

export const SUPPORTED_CODE_LANGUAGES: ICodeLanguage[] = [
  {
    id: "python",
    name: "Python",
    code_snippet: `def solution():
    # Your code here
    pass`,
  },
  {
    id: "javascript",
    name: "JavaScript",
    code_snippet: `function solution() {
    // Your code here
}`,
  },
  {
    id: "cpp",
    name: "C++",
    code_snippet: `class Solution {
public:
    int solution() {
        // Your code here
        return 0;
    }
};`,
  },
];

export const DEFAULT_SETTINGS: ICodeEditorSettings = {
  codeReview: {
    mode: REVIEW_MODE.STEP_CODE,
    showInstructions: true,
  },
};