import { BACKEND_API } from "@/lib/configs/environment";
import fetcher from "@/lib/utils/fetcher";
import type { REVIEW_MODE, STEP_STATUS } from "../utils/constants";

const AI_REVIEW_ENDPOINTS = {
  REVIEW: `${BACKEND_API}/workflows/run`,
};

export interface IAIReviewParams {
  inputs: {
    mode: REVIEW_MODE.FULL_CODE | REVIEW_MODE.STEP_CODE;
    purpose: string;
    example_code: string;
    user_code: string;
    step_description?: string; // STEP_CODE mode only
  };
  response_mode: string;
  user: string;
}

export interface IAIReviewResponse {
  task_id: string;
  workflow_run_id: string;
  data: {
    id: string;
    outputs: {
      message: string;
      status?: STEP_STATUS.PASSED | STEP_STATUS.NOT_PASSED;
    };
    error: string;
    created_at: number; // Unix timestamp
    finished_at: number; // Unix timestamp
  };
}

export const aiReviewServices = {
  getAIReview: async (params: IAIReviewParams) => {
    const response = await fetcher<IAIReviewResponse>([
      AI_REVIEW_ENDPOINTS.REVIEW,
      {
        method: "POST",
        data: params,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer app-epKXRbALse3pFAAHr3SfrOie",
        },
      },
    ]);
    return response;
  },
};
