import { toast } from "sonner";
import useSWR from "swr";
import { exercisesManagementServices } from "../services/exercises-management";
import type { IExercise } from "../utils/types";

export const EXERCISES_MANAGEMENT_CACHE_KEYS = {
  EXERCISES: "exercises",
};

export const useExercisesManagementSWR = () => {
  const {
    data: exercises,
    error: exercisesError,
    isLoading: isLoadingExercises,
    mutate: mutateExercises,
  } = useSWR<IExercise[]>(
    EXERCISES_MANAGEMENT_CACHE_KEYS.EXERCISES,
    exercisesManagementServices.getExercises,
    {
      onError: (error) => {
        toast.error("Failed to fetch exercises");
        console.error("Failed to fetch exercises:", error);
      },
    }
  );

  return {
    exercises,
    exercisesError,
    isLoadingExercises,
    mutateExercises,
  };
};
