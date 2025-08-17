import type { ISubmissionStatus } from "./types";

export enum SUMMARY_CRITERIA_STATUS {
  PASS = "Pass",
  FAIL = "Fail",
  PARTIAL = "Partial",
}

export enum HARD_CRITERIA_STATUS {
  PASS = "Pass",
  FAIL = "Fail",
  PARTIAL = "Partial",
}

export enum FLEXIBLE_CRITERIA_STATUS {
  GOOD = "Good",
  ACCEPTABLE = "Acceptable",
  NEEDS_IMPROVEMENT = "Needs Improvement",
}

export enum QUALITY_LEVEL {
  GOOD = "Good",
  ACCEPTABLE = "Acceptable",
  POOR = "Poor",
}

export const SUBMISSION_STATUSES: Record<string, ISubmissionStatus> = {
  ac: {
    code: "ac",
    title: "Accepted",
    description:
      "Your code passed all the test cases, and the problem is successfully solved.",
  },
  wa: {
    code: "wa",
    title: "Wrong Answer",
    description:
      "Your code produces incorrect output for one or more test cases.",
  },
  re: {
    code: "re",
    title: "Runtime Error",
    description:
      "Your code crashed (e.g., segmentation fault, division by zero) during execution on some test cases.",
  },
  ce: {
    code: "ce",
    title: "Compilation Error",
    description: "Your code did not compile successfully.",
  },
  mle: {
    code: "mle",
    title: "Memory Limit Exceeded",
    description: "Your program used more memory than allowed.",
  },
  tle: {
    code: "tle",
    title: "Time Limit Exceeded",
    description:
      "Your code did not produce output within the allowed time for some test cases; a sign of inefficient algorithm.",
  },
  pa: {
    code: "pa",
    title: "Partial Acceptance",
    description:
      "Your code passes only a subset of the test cases (common in problems with subtask-based scoring).",
  },
};
