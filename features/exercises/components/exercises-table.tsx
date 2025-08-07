"use client";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import ErrorAlert from "@/components/common/error-alert";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useDataTable } from "@/lib/hooks/use-data-table";
import { useExercisesManagementSWR } from "../hooks/user-exercises-management-swr";
import type { IExercise } from "../utils/types";
import { getExercisesColumnConfig } from "./exercsies-column-config";

const ExerciseTable = () => {
	const router = useRouter();
	const memoizedColumns = useMemo(() => getExercisesColumnConfig(), []);
	const { exercises, isLoadingExercises, exercisesError } =
		useExercisesManagementSWR();

	function handleNavigateExercise(exercise: IExercise) {
		router.push(`/exercise/${exercise.id}`);
	}

	const { table } = useDataTable({
		data: exercises || [],
		columns: memoizedColumns,
		pageCount: 1,
		initialState: {
			columnPinning: { right: ["actions"] },
		},
		getRowId: (originalRow) => originalRow.id,
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
