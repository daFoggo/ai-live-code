import {
	AlertCircle,
	BadgeCheck,
	BadgeMinus,
	BadgeX,
	Bug,
	CheckCircle,
	Clock,
	MemoryStick,
	XCircle,
} from "lucide-react";
import type { IDataMappingConfig } from "@/lib/types/data-mapping";
import { SUMMARY_CRITERIA_STATUS } from "./constants";

export const getSummaryCriteriaStatusConfig = (
	criteria: SUMMARY_CRITERIA_STATUS,
): IDataMappingConfig => {
	switch (criteria) {
		case SUMMARY_CRITERIA_STATUS.PASS:
			return {
				label: "Pass",
				icon: <BadgeCheck />,
				cardColor:
					"text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800",
				badgeColor:
					"bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300",
			};
		case SUMMARY_CRITERIA_STATUS.FAIL:
			return {
				label: "Fail",
				icon: <BadgeX />,
				cardColor:
					"text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800",
				badgeColor:
					"bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
			};
		case SUMMARY_CRITERIA_STATUS.PARTIAL:
			return {
				label: "Partial",
				icon: <BadgeMinus />,
				cardColor:
					"text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800",
				badgeColor:
					"bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300",
			};
	}
};

export const getHardCriteriaStatusConfig = (status: string) => {
	switch (status) {
		case "Pass":
			return {
				icon: <CheckCircle className="size-3" />,
				badgeColor:
					"bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300",
				cardColor:
					"bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800",
			};
		case "Fail":
			return {
				icon: <XCircle className="size-3" />,
				badgeColor:
					"bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
				cardColor:
					"bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800",
			};
		case "Partial":
			return {
				icon: <AlertCircle className="size-3" />,
				badgeColor:
					"bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300",
				cardColor:
					"bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800",
			};
		default:
			return {
				icon: <AlertCircle className="size-3" />,
				badgeColor:
					"bg-gray-100 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300",
				cardColor:
					"bg-gray-50 dark:bg-gray-950/50 border-gray-200 dark:border-gray-800",
			};
	}
};

export const getFlexibleCriteriaStatusConfig = (status: string) => {
	switch (status) {
		case "Good":
			return {
				icon: <CheckCircle className="size-3" />,
				badgeColor:
					"bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300",
				cardColor:
					"bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800",
			};
		case "Acceptable":
			return {
				icon: <AlertCircle className="size-3" />,
				badgeColor:
					"bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300",
				cardColor:
					"bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800",
			};
		case "Needs Improvement":
			return {
				icon: <XCircle className="size-3" />,
				badgeColor:
					"bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
				cardColor:
					"bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800",
			};
		default:
			return {
				icon: <AlertCircle className="size-3" />,
				badgeColor:
					"bg-gray-200 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300",
				cardColor:
					"bg-gray-50 dark:bg-gray-950/50 border-gray-200 dark:border-gray-800",
			};
	}
};

export const getSubmissionStatusConfig = (status: string) => {
	switch (status) {
		case "ac":
			return {
				icon: <CheckCircle className="size-3" />,
				badgeColor:
					"bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300",
				cardColor:
					"bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800",
			};
		case "wa":
			return {
				icon: <XCircle className="size-3" />,
				badgeColor:
					"bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
				cardColor:
					"bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800",
			};
		case "re":
			return {
				icon: <Bug className="size-3" />,
				badgeColor:
					"bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
				cardColor:
					"bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800",
			};
		case "ce":
			return {
				icon: <AlertCircle className="size-3" />,
				badgeColor:
					"bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
				cardColor:
					"bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800",
			};
		case "mle":
			return {
				icon: <MemoryStick className="size-3" />,
				badgeColor:
					"bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300",
				cardColor:
					"bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-800",
			};
		case "tle":
			return {
				icon: <Clock className="size-3" />,
				badgeColor:
					"bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300",
				cardColor:
					"bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-800",
			};
		case "pa":
			return {
				icon: <AlertCircle className="size-3" />,
				badgeColor:
					"bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300",
				cardColor:
					"bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800",
			};
		default:
			return {
				icon: <AlertCircle className="size-3" />,
				badgeColor:
					"bg-gray-100 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300",
				cardColor:
					"bg-gray-50 dark:bg-gray-950/50 border-gray-200 dark:border-gray-800",
			};
	}
};
