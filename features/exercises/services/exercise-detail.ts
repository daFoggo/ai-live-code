import { DB_API } from "@/lib/configs/environment";
import fetcher from "@/lib/utils/fetcher";
import type { IExercise } from "../utils/types";

const EXERCISES_DETAIL_ENDPOINTS = {
  GET_EXERCISE: (id: string) => `${DB_API}/problems/${id}`,
};

export interface IGetExerciseDetailResponse {
  success: boolean;
  data: IExercise;
}

export const exerciseDetailServices = {
  getExerciseDetail: async (id: string): Promise<IExercise> => {
    const response = await fetcher<IGetExerciseDetailResponse>([
      EXERCISES_DETAIL_ENDPOINTS.GET_EXERCISE(id),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer app-epKXRbALse3pFAAHr3SfrOie",
        },
      },
    ]);

    return response.data;
  },
};
