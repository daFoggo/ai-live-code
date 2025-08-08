"use client";

import PageHeading from "@/components/common/page-heading";
import ExerciseTable from "./exercises-table";

export const Exercises = () => {
    return (
        <div className="flex flex-col gap-6">
            <PageHeading title="Problem list" />
            <ExerciseTable />
        </div>
    )
}
