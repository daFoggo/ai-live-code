import { SAMPLE_EXERCISE } from "../utils/constants";
import type { IExercise } from "../utils/types";

const exerciseData: IExercise[] = [...SAMPLE_EXERCISE];

export const exerciseDetailServices = {
	getExerciseDetail: async (id: string): Promise<IExercise | undefined> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const exercise = exerciseData.find((ex) => ex.id === id);
				resolve(exercise);
			}, 1000);
		});
	},
};
