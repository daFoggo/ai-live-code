"use client";

import { GeminiIcon } from "@/components/common/icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { generateId } from "@/lib/utils/id";
import { cn } from "@/lib/utils/tailwind";
import { SAMPLE_STUDENT_CODE_EVALUATION } from "../../utils/data";
import { getSummaryCriteriaStatusConfig } from "../../utils/functions";
import { NumberedCard } from "./numbered-card";

export const OverallSection = () => {
    const overallStatusConfig = getSummaryCriteriaStatusConfig(
        SAMPLE_STUDENT_CODE_EVALUATION.summary.status,
    );

    return (
        <Card>
            <CardHeader className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <GeminiIcon className="size-4" />
                    <CardTitle>Overall</CardTitle>
                </div>
                <Badge className={cn("", overallStatusConfig?.badgeColor)}>
                    {overallStatusConfig?.icon}
                    {overallStatusConfig?.label.toUpperCase()}
                </Badge>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Textarea
                    value={SAMPLE_STUDENT_CODE_EVALUATION.summary.overallAssessment}
                    readOnly
                    className="min-h-[200px] sm:min-h-[70px] resize-none"
                />
                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">

                    {/*Strengths */}
                    <div className="flex flex-col items-start gap-2">
                        <div className="flex items-center gap-2">
                            <p className="font-medium text-emerald-600 dark:text-emerald-400 text-sm">
                                Strengths
                            </p>
                            <Badge className="bg-emerald-100 dark:bg-emerald-900/50 rounded-full size-5 tabular-nums text-emerald-700 dark:text-emerald-300">
                                {SAMPLE_STUDENT_CODE_EVALUATION?.summary?.strengths?.length}
                            </Badge>
                        </div>
                        <div className="flex flex-col gap-2 p-0.5 w-full">
                            {SAMPLE_STUDENT_CODE_EVALUATION?.summary?.strengths?.map(
                                (strength, index) => (
                                    <NumberedCard
                                        key={generateId()}
                                        content={strength}
                                        index={index}
                                        keyPrefix="strength"
                                        className="bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400"
                                    />
                                ),
                            )}
                        </div>
                    </div>

                    {/*Weaknesses */}
                    <div className="flex flex-col items-start gap-2">
                        <div className="flex items-center gap-2">
                            <p className="font-medium text-red-600 dark:text-red-400 text-sm">
                                Weaknesses
                            </p>
                            <Badge className="bg-red-100 dark:bg-red-900/50 rounded-full size-5 tabular-nums text-red-700 dark:text-red-300">
                                {SAMPLE_STUDENT_CODE_EVALUATION?.summary?.weaknesses?.length}
                            </Badge>
                        </div>
                        <div className="flex flex-col gap-2 p-0.5 w-full">
                            {SAMPLE_STUDENT_CODE_EVALUATION?.summary?.weaknesses?.map(
                                (weakness, index) => (
                                    <NumberedCard
                                        key={generateId()}
                                        content={weakness}
                                        index={index}
                                        keyPrefix="weakness"
                                        className="bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
                                    />
                                ),
                            )}
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="flex flex-col items-start gap-2">
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-primary text-sm">Recommendations</p>
                        <Badge className="bg-primary/30 rounded-full size-5 tabular-nums text-primary text-xs">
                            {SAMPLE_STUDENT_CODE_EVALUATION?.summary?.recommendations?.length}
                        </Badge>
                    </div>
                    <div className="flex flex-col gap-2 p-0.5 w-full">
                        {SAMPLE_STUDENT_CODE_EVALUATION?.summary?.recommendations?.map(
                            (recommendation, index) => (
                                <NumberedCard
                                    key={generateId()}
                                    content={recommendation}
                                    index={index}
                                    keyPrefix="recommendation"
                                    className="bg-primary/10 border-primary text-primary"
                                />
                            ),
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
