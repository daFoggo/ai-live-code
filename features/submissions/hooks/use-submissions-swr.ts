import { useCallback } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import {
  type IPostSubmissionParams,
  submissionsServices,
} from "../services/submissions";

export const SUBMISSIONS_CACHE_KEYS = {
  POST_SUBMISSION: "post_submission",
};

export const useSubmissionsSWR = () => {
  const {
    trigger: submissionTrigger,
    isMutating: isProcessingSubmission,
    error: submissionError,
    data: submissionData,
    reset: resetSubmission,
  } = useSWRMutation(
    SUBMISSIONS_CACHE_KEYS.POST_SUBMISSION,
    async (_, { arg }: { arg: IPostSubmissionParams }) => {
      return await submissionsServices.postSubmission(arg);
    },
    {
      onError: (error) => {
        toast.error("Failed to process code evaluation");
        console.error("Failed to process code evaluation:", error);
      },
    }
  );

  const submitCode = useCallback(
    async (params: IPostSubmissionParams) => {
      return await submissionTrigger(params);
    },
    [submissionTrigger]
  );

  return {
    submissionData,
    submissionError,
    submitCode,
    isProcessingSubmission,
    resetSubmission,
  };
};
