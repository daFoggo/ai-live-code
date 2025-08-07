"use client";
import type { Column, ColumnDef } from "@tanstack/react-table";
import { truncate } from "lodash";
import { useMemo } from "react";
import { MarkdownKatexRenderer } from "@/components/common/markdown-katex-renderer";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { enumsToOptions } from "@/lib/utils/enums-to-options";
import { EXERCISE_LEVEL } from "../utils/constants";
import type { IExercise } from "../utils/types";
import { ExerciseLevelBadge } from "./exercise-level-badge";

export const getExercisesColumnConfig = (): ColumnDef<IExercise>[] => {
	return [
		{
			id: "index",
			header: ({ column }: { column: Column<IExercise, unknown> }) => (
				<DataTableColumnHeader column={column} title="STT" className="flex justify-center items-center w-full text-center" />
			),
			cell: ({ row, table }) => {
				const sortedRows = table.getSortedRowModel().flatRows;
				const indexMap = useMemo(() => {
					const map = new Map();
					sortedRows.forEach((sortedRow, index) => {
						map.set(sortedRow.id, index + 1);
					});
					return map;
				}, [sortedRows]);

				const displayIndex = indexMap.get(row.id) || 1;

				return (
					<div className="font-medium text-muted-foreground text-center">
						{displayIndex}
					</div>
				);
			},
			meta: {
				label: "STT",
			},
			enableSorting: false,
			enableColumnFilter: false,
			size: 60,
		},
		{
			id: "id",
			accessorKey: "id",
			header: ({ column }: { column: Column<IExercise, unknown> }) => (
				<DataTableColumnHeader column={column} title="ID" />
			),
			cell: ({ cell }) => (
				<div className="bg-muted px-3 py-1 rounded-lg w-fit font-mono font-medium">
					{cell.getValue<IExercise["id"]>()}
				</div>
			),
			meta: {
				label: "ID",
			},
			size: 30,
		},
		{
			id: "name",
			accessorKey: "name",
			header: ({ column }: { column: Column<IExercise, unknown> }) => (
				<DataTableColumnHeader column={column} title="Tên bài" />
			),
			cell: ({ cell }) => (
				<div className="font-semibold">
					{cell.getValue<IExercise["name"]>()}
				</div>
			),
			meta: {
				label: "Tên bài",
				placeholder: "Tìm theo tên bài",
				variant: "text",
			},
			enableColumnFilter: true,
		},
		{
			id: "statement",
			accessorKey: "statement",
			header: ({ column }: { column: Column<IExercise, unknown> }) => (
				<DataTableColumnHeader column={column} title="Mô tả" />
			),
			cell: ({ cell }) => {
				const statement = cell.getValue<IExercise["statement"]>();
				return (
					<MarkdownKatexRenderer
						content={truncate(statement, { length: 75 })}
					/>
				);
			},
			meta: {
				label: "Mô tả",
			},
			enableSorting: false,
			size: 300,
		},
		{
			id: "level",
			accessorKey: "level",
			header: ({ column }: { column: Column<IExercise, unknown> }) => (
				<DataTableColumnHeader column={column} title="Mức độ" />
			),
			cell: ({ cell }) => (
				<ExerciseLevelBadge level={cell.getValue<IExercise["level"]>()} />
			),
			meta: {
				label: "Mức độ",
				variant: "multiSelect",
				options: enumsToOptions(EXERCISE_LEVEL),
			},
			enableColumnFilter: true,
			enableSorting: false,
			size: 100,
		},
	];
};
