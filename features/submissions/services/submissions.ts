import { BACKEND_API } from "@/lib/configs/environment";
import fetcher from "@/lib/utils/fetcher";
import type { ICodeEvaluation } from "../utils/types";

const SUBMISSIONS_ENDPOINTS = {
  POST_SUBMISSION: `${BACKEND_API}/workflows/run`,
};

export interface IPostSubmissionParams {
  inputs: {
    purpose: string;
    example_code: string;
    user_code: string;
  };
  response_mode: string;
  user: string;
}

export interface IPostSubmissionResponse {
  task_id: string;
  workflow_run_id: string;
  data: {
    id: string;
    outputs: {
      message: string | ICodeEvaluation; // string cho dạng raw
    };
    error: string;
    created_at: number; // Unix timestamp
    finished_at: number; // Unix timestamp
  };
}

export const submissionsServices = {
  postSubmission: async (params: IPostSubmissionParams) => {
    const rawResponse = await fetcher<IPostSubmissionResponse>([
      SUBMISSIONS_ENDPOINTS.POST_SUBMISSION,
      {
        method: "POST",
        data: params,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer app-hRKJWqE0XaKvNIl7u89cbFDL",
        },
      },
    ]);

    let parsedMessage: ICodeEvaluation;
    try {
      parsedMessage = JSON.parse(rawResponse.data.outputs.message as string);
    } catch (error) {
      console.error("Failed to parse message:", error);
      throw new Error("Invalid JSON format in message response");
    }

    return {
      ...rawResponse,
      data: {
        ...rawResponse.data,
        outputs: {
          message: parsedMessage,
        },
      },
    };
  },
};
