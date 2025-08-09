import { useCallback } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import {
	aiReviewServices,
	type IAIReviewParams,
	type IAIReviewResponse,
} from "../services/ai-review";
import type { IMessage } from "../utils/types";

export const AI_REVIEW_CACHE_KEYS = {
	AI_REVIEW: "ai_review",
};

const transformAIFeedbackToMessage = (
	response: IAIReviewResponse,
): IMessage => {
	return {
		feedback: response.data.outputs.message,
		stepStatus: response.data.outputs.status,
		metadata: {
			messageId: response.data.id,
			timestamp: new Date(response.data.finished_at * 1000).toISOString(),
			sender: "ai",
			type: "response",
		},
	};
};

export const useAIReviewSWR = () => {
	const {
		trigger: aiReviewTrigger,
		isMutating: isProcessingAIReview,
		error: aiReviewError,
		data: aiReviewData,
		reset: resetAIReview,
	} = useSWRMutation(
		AI_REVIEW_CACHE_KEYS.AI_REVIEW,
		async (_, { arg }: { arg: IAIReviewParams }) => {
			const response = await aiReviewServices.getAIReview(arg);
			return transformAIFeedbackToMessage(response);
		},
		{
			onSuccess: (data: IMessage) => {
				toast.success("AI Review completed successfully!");
				console.log("AI Review completed:", data);
			},
			onError: (error) => {
				toast.error("Failed to process AI Review");
				console.error("Failed to process AI Review:", error);
			},
		},
	);

	const requestAIReview = useCallback(
		async (params: IAIReviewParams) => {
			return await aiReviewTrigger(params);
		},
		[aiReviewTrigger],
	);

	return {
		aiReviewData,
		aiReviewError,
		requestAIReview,
		isProcessingAIReview,
		resetAIReview,
	};
};
 