import type { EXERCISE_LEVEL } from "./constants";

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
