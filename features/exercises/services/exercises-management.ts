import { DB_API } from "@/lib/configs/environment";
import { fetcherWithParams } from "@/lib/utils/fetcher";
import type { IExercise } from "../utils/types";

const EXERCISES_MANAGEMENT_ENDPOINTS = {
  GET_EXERCISES: `${DB_API}/problems`,
};

export interface IGetExerciseListParams {
  offset: number;
  limit: number;
  count: number;
  [key: string]: unknown;
}
export interface IGetExercisesListResponse {
  success: boolean;
  data: IExercise[];
  offset: number;
  limit: number;
  count: number;
}

export const exercisesManagementServices = {
  getExercises: async (
    params: IGetExerciseListParams
  ): Promise<IGetExercisesListResponse> => {
    const response = await fetcherWithParams<IGetExercisesListResponse>([
      EXERCISES_MANAGEMENT_ENDPOINTS.GET_EXERCISES,
      params,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer app-epKXRbALse3pFAAHr3SfrOie",
        },
      },
    ]);

    return response;
  },
};
