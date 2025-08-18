"use client";
import type { Column, ColumnDef } from "@tanstack/react-table";
import { truncate } from "lodash";
import { Check, X } from "lucide-react";
import { useMemo } from "react";
import { MarkdownKatexRenderer } from "@/components/common/markdown-katex-renderer";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import type { IExercise } from "../utils/types";
import { ExerciseLevelBadge } from "./exercise-level-badge";

export const getExercisesColumnConfig = (): ColumnDef<IExercise>[] => {
	return [
		{
			id: "index",
			header: ({ column }: { column: Column<IExercise, unknown> }) => (
				<DataTableColumnHeader
					column={column}
					title="Index"
					className="flex justify-center items-center w-full text-center"
				/>
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
				label: "Index",
			},
			enableSorting: false,
			enableColumnFilter: false,
			size: 60,
		},
		{
			id: "problem_id",
			accessorKey: "problem_id",
			header: ({ column }: { column: Column<IExercise, unknown> }) => (
				<DataTableColumnHeader column={column} title="Problem ID" />
			),
			cell: ({ cell }) => (
				<div className="bg-muted px-3 py-1 rounded-lg w-fit font-mono font-medium">
					{cell.getValue<IExercise["problem_id"]>()}
				</div>
			),
			meta: {
				label: "Problem ID",
			},
			size: 30,
		},
		{
			id: "name",
			accessorKey: "name",
			header: ({ column }: { column: Column<IExercise, unknown> }) => (
				<DataTableColumnHeader column={column} title="Problem name" />
			),
			cell: ({ cell }) => (
				<div className="font-semibold">
					{cell.getValue<IExercise["name"]>()}
				</div>
			),
			meta: {
				label: "Problem name",
				placeholder: "Search by problem name",
				variant: "text",
			},
			enableColumnFilter: true,
		},
		{
			id: "description",
			accessorKey: "description",
			header: ({ column }: { column: Column<IExercise, unknown> }) => (
				<DataTableColumnHeader column={column} title="Description" />
			),
			cell: ({ cell }) => {
				const description = cell.getValue<IExercise["description"]>();
				return (
					<MarkdownKatexRenderer
						content={truncate(description, { length: 50 })}
					/>
				);
			},
			meta: {
				label: "Description",
			},
			enableSorting: false,
			size: 300,
		},
		{
			id: "difficulty",
			accessorKey: "difficulty",
			header: ({ column }: { column: Column<IExercise, unknown> }) => (
				<DataTableColumnHeader column={column} title="Difficulty" />
			),
			cell: ({ cell }) => (
				<ExerciseLevelBadge level={cell.getValue<IExercise["difficulty"]>()} />
			),
			meta: {
				label: "Difficulty",
				variant: "multiSelect",
				options: [
					{ label: "Easy", value: "1" },
					{ label: "Medium", value: "2" },
					{ label: "Hard", value: "3" },
				],
			},
			size: 100,
		},
		{
			id: "isDone",
			accessorKey: "isDone",
			header: ({ column }: { column: Column<IExercise, unknown> }) => (
				<DataTableColumnHeader
					column={column}
					title="Status"
					className="flex justify-center items-center w-full text-center"
				/>
			),
			cell: ({ cell }) => {
				const isDone = cell.getValue<boolean>();
				return (
					<div className="flex justify-center items-center">
						{isDone ? (
							<Badge
								variant="default"
								className="bg-green-100 hover:bg-green-200 border-green-300 text-green-800"
							>
								<Check className="mr-1 size-3" />
								Completed
							</Badge>
						) : (
							<Badge
								variant="secondary"
								className="bg-gray-100 hover:bg-gray-200 text-gray-600"
							>
								<X className="mr-1 size-3" />
								Pending
							</Badge>
						)}
					</div>
				);
			},
			meta: {
				label: "Status",
				variant: "select",
				options: [
					{ label: "All", value: "" },
					{ label: "Completed", value: "true" },
					{ label: "Pending", value: "false" },
				],
			},
			size: 120,
		},
	];
};
