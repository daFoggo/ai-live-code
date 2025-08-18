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
                <DataTableColumnHeader column={column} title="Index" className="flex justify-center items-center w-full text-center" />
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
                options: enumsToOptions(EXERCISE_LEVEL),
            },
            enableColumnFilter: true,
            enableSorting: false,
            size: 100,
        },
    ];
};