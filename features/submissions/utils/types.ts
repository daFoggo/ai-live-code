import type {
  FLEXIBLE_CRITERIA_STATUS,
  HARD_CRITERIA_STATUS,
  QUALITY_LEVEL,
  SUMMARY_CRITERIA_STATUS,
} from "./constants";

export interface IEvidence {
  description: string;
  codeLine?: number;
}

export interface IEvaluation {
  status?: HARD_CRITERIA_STATUS | FLEXIBLE_CRITERIA_STATUS;
  quality?: QUALITY_LEVEL;
  issues: string[];
  evidence: IEvidence[];

  // compilabilityAndExecution
  syntaxErrors?: string[];
  runtimeErrors?: string[];

  // complexityAndEfficiency
  timeComplexity?: string;
  spaceComplexity?: string;
  isOptimal?: boolean;

  // algorithmRequirements
  requiredAlgorithm?: string;
  implementedAlgorithm?: string;

  // submissionGuidelines
  inputOutputFormat?: boolean;
  otherRequirements?: string[];

  // algorithmicSteps
  logicalFlow?: string[];
  missingSteps?: string[];
  incorrectSteps?: string[];

  // algorithmDesign
  appropriateness?: string;
  designChoices?: string[];
  improvements?: string[];

  // edgeCaseHandling
  handledCases?: string[];
  missingCases?: string[];

  // readabilityAndMaintainability
  overall?: FLEXIBLE_CRITERIA_STATUS;
}

export interface IReadabilityComponent {
  quality: QUALITY_LEVEL;
  issues: string[];
  evidence: IEvidence[];
}

export interface ICodeEvaluation {
  hardCriteria: {
    correctness: IEvaluation;
    languageSpecifications: IEvaluation;
    compilabilityAndExecution: IEvaluation;
    complexityAndEfficiency: IEvaluation;
    algorithmRequirements: IEvaluation;
    submissionGuidelines: IEvaluation;
  };

  flexibleCriteria: {
    algorithmicSteps: IEvaluation;
    algorithmDesignAndEfficiency: IEvaluation;
    readabilityAndMaintainability: IEvaluation & {
      codeComments: IReadabilityComponent;
      modularity: IReadabilityComponent;
      codingStyle: IReadabilityComponent;
    };
    edgeCaseHandling: IEvaluation;
  };

  summary: {
    overallAssessment: string;
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
    status: SUMMARY_CRITERIA_STATUS;
  };

  metadata: {
    evaluationDate: string;
    algorithm: string;
    language: string;
    problemType: string;
  };
}

export interface ISubmissionStatus {
  code: string;
  title: string;
  description: string;
}
