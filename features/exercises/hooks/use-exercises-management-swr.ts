import { toast } from "sonner";
import useSWR from "swr";
import {
  exercisesManagementServices,
  type IGetExerciseListParams,
  type IGetExercisesListResponse,
} from "../services/exercises-management";

export const EXERCISES_MANAGEMENT_CACHE_KEYS = {
  EXERCISES: "exercises",
};

export const useExercisesManagementSWR = (params: IGetExerciseListParams) => {
  const cacheKey = [EXERCISES_MANAGEMENT_CACHE_KEYS.EXERCISES, params];

  const {
    data: exercisesResponse,
    error: exercisesError,
    isLoading: isLoadingExercises,
    mutate: mutateExercises,
  } = useSWR<IGetExercisesListResponse>(
    cacheKey,
    async () => {
      const response = await exercisesManagementServices.getExercises(params);
      return response;
    },
    {
      onError: (error) => {
        toast.error("Failed to fetch exercises");
        console.error("Failed to fetch exercises:", error);
      },
    }
  );

  return {
    exercises: exercisesResponse?.data || [],
    exercisesError,
    isLoadingExercises,
    mutateExercises,
    offset: exercisesResponse?.offset,
    limit: exercisesResponse?.limit,
    count: exercisesResponse?.count,
  };
};
