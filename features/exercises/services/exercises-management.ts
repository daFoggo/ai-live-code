import { SAMPLE_EXERCISE } from "../utils/constants";
import type { IExercise } from "../utils/types";

const exerciseData: IExercise[] = [...SAMPLE_EXERCISE];

export const exercisesManagementServices = {
  getExercises: async (): Promise<IExercise[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...exerciseData]);
      }, 1000);
    });
  },
};
