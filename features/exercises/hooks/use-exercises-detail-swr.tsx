import { toast } from "sonner";
import useSWR from "swr";
import { exerciseDetailServices } from "../services/exercise-detail";
import type { IExercise } from "../utils/types";

export const EXERCISES_DETAIL_CACHE_KEYS = {
    EXERCISE_DETAIL: "exercise_detail",
};

export const useExerciseDetailSWR = (id?: string) => {
    const {
        data: exerciseDetail,
        error: exerciseDetailError,
        isLoading: isLoadingExerciseDetail,
        mutate: mutateExerciseDetail,
    } = useSWR<IExercise | undefined>(
        id ? [EXERCISES_DETAIL_CACHE_KEYS.EXERCISE_DETAIL, id] : null,
        ([_, exerciseId]: [string, string]) => exerciseDetailServices.getExerciseDetail(exerciseId),
        {
            onError: (error) => {
                toast.error("Failed to fetch exercise detail");
                console.error("Failed to fetch exercise detail:", error);
            },
        },
    );

    return {
        exerciseDetail,
        exerciseDetailError,
        isLoadingExerciseDetail,
        mutateExerciseDetail,
    };
};