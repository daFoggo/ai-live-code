"use client";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import ErrorAlert from "@/components/common/error-alert";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/lib/hooks/use-data-table";
import { useExercisesManagementSWR } from "../hooks/use-exercises-management-swr";
import type { IGetExerciseListParams } from "../services/exercises-management";
import type { IExercise } from "../utils/types";
import { getExercisesColumnConfig } from "./exercsies-column-config";

const ExerciseTable = () => {
	const router = useRouter();
	const memoizedColumns = useMemo(() => getExercisesColumnConfig(), []);
	// biome-ignore lint/correctness/noUnusedVariables: <later>
	const [params, setParams] = useState<IGetExerciseListParams>({
		offset: 0,
		limit: 20,
		count: 20,
	});

	const { exercises, isLoadingExercises, exercisesError } =
		useExercisesManagementSWR(params);

	function handleNavigateExercise(exercise: IExercise) {
		router.push(`/exercise/${exercise.problem_id}`);
	}

	const { table } = useDataTable({
		data: exercises || [],
		columns: memoizedColumns,
		pageCount: 1,
		initialState: {
			columnPinning: { right: ["actions"] },
		},
		getRowId: (originalRow) => originalRow.problem_id,
	});

	if (isLoadingExercises) {
		return (
			<DataTableSkeleton
				columnCount={5}
				filterCount={2}
				cellWidths={["1.875rem", "2.875rem", "auto", "18.75rem", "6.25rem"]}
				shrinkZero
			/>
		);
	}

	if (exercisesError || !exercises) {
		return (
			<ErrorAlert
				title="Error loading exercises"
				description="Please try again later."
			/>
		);
	}
	return (
		<DataTable table={table} onRowClick={handleNavigateExercise}>
			<DataTableToolbar table={table} />
		</DataTable>
	);
};

export default ExerciseTable;
