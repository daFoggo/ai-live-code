"use client";

import { Info, MemoryStick, Timer } from "lucide-react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	LabelList,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";
import { StatisticBlock } from "@/components/common/statistic-block";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils/tailwind";
import { SUBMISSION_STATUSES } from "../utils/constants";
import { getSubmissionStatusConfig } from "../utils/functions";

export const OverviewContent = () => {
	const userRuntime = 7;

	const runtimeData = [
		{ runtime: "0-5ms", percentage: 15.2, users: 1520, range: [0, 5] },
		{ runtime: "6-10ms", percentage: 32.8, users: 3280, range: [6, 10] },
		{ runtime: "11-15ms", percentage: 28.5, users: 2850, range: [11, 15] },
		{ runtime: "16-20ms", percentage: 12.3, users: 1230, range: [16, 20] },
		{ runtime: "21-25ms", percentage: 6.7, users: 670, range: [21, 25] },
		{ runtime: "26-30ms", percentage: 3.1, users: 310, range: [26, 30] },
		{ runtime: "31-35ms", percentage: 1.2, users: 120, range: [31, 35] },
		{ runtime: "36ms+", percentage: 0.2, users: 20, range: [36, 100] },
	];

	const getUserRuntimeIndex = () => {
		return runtimeData.findIndex(
			(item) => userRuntime >= item.range[0] && userRuntime <= item.range[1],
		);
	};

	const userRuntimeIndex = getUserRuntimeIndex();

	const renderCustomLabel = (props: {
		x?: number | string;
		y?: number | string;
		width?: number | string;
		index?: number | string;
		value?: number | string;
	}) => {
		const { x, y, width, index, value } = props;

		if (
			typeof x !== "number" ||
			typeof y !== "number" ||
			typeof width !== "number" ||
			typeof index !== "number" ||
			typeof value !== "number"
		) {
			return null;
		}

		if (index === userRuntimeIndex) {
			return (
				<text
					x={x + width / 2}
					y={y - 5}
					textAnchor="middle"
					fill="var(--chart-1)"
					fontSize="12"
					fontWeight="600"
				>
					You
				</text>
			);
		}
		return null;
	};

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center gap-4">
				<Tooltip>
					<TooltipTrigger asChild>
						<Badge
							className={cn(
								"font-semibold text-lg sm:text-xl cursor-help",
								getSubmissionStatusConfig(SUBMISSION_STATUSES.ac.code)
									.badgeColor,
							)}
						>
							{SUBMISSION_STATUSES.ac.title}
						</Badge>
					</TooltipTrigger>
					<TooltipContent>{SUBMISSION_STATUSES.ac.description}</TooltipContent>
				</Tooltip>
				<Separator orientation="vertical" className="min-h-8" />
				<p className="text-muted-foreground text-xs sm:text-base">
					<span className="font-medium">0/64</span> cases passed
				</p>
			</div>
			<div className="gap-6 grid grid-cols-1 md:grid-cols-2 dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/10 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs">
				<StatisticBlock
					title="Runtime"
					value="7 ms"
					icon={<Timer />}
					size="medium"
				/>
				<StatisticBlock
					title="Memory"
					value="19.32 MB"
					icon={<MemoryStick />}
					size="medium"
				/>
			</div>

			<ChartContainer
				config={{
					percentage: {
						label: "Percentage of Users",
						color: "var(--chart-1)",
					},
					users: {
						label: "Number of Users",
						color: "var(--chart-2))",
					},
				}}
				className="w-full h-[300px]"
			>
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={runtimeData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="runtime" tick={{ fontSize: 12 }} />
						<YAxis
							tick={{ fontSize: 12 }}
							label={{
								value: "% of Users",
								angle: -90,
								position: "insideLeft",
								style: { textAnchor: "middle" },
							}}
						/>
						<ChartTooltip
							content={({ active, payload, label }) => {
								if (active && payload && payload.length) {
									const data = payload[0].payload;
									const isUserBar =
										payload[0].payload === runtimeData[userRuntimeIndex];
									const color = isUserBar ? "var(--chart-1)" : "var(--chart-2)";

									return (
										<div className="flex flex-col gap-2 bg-background shadow-lg p-3 border border-border rounded-lg min-w-[200px]">
											<div className="flex items-center gap-2 pb-1 border-b border-border">
												<span className="font-medium text-xs">
													Runtime: {label}
												</span>
											</div>
											<div className="flex justify-between items-center gap-4">
												<div className="flex items-center gap-2">
													<div
														className="rounded-[2px] w-2.5 h-2.5 shrink-0"
														style={{ backgroundColor: color }}
													/>
													<span className="text-muted-foreground text-xs">
														Percentage of Users
													</span>
												</div>
												<p className="font-medium text-xs">
													{data.percentage}%
												</p>
											</div>
											<div className="flex justify-between items-center gap-4">
												<div className="flex items-center gap-2">
													<div
														className="rounded-[2px] w-2.5 h-2.5 shrink-0"
														style={{ backgroundColor: "var(--chart-2)" }}
													/>
													<span className="text-muted-foreground text-xs">
														Number of Users
													</span>
												</div>
												<p className="font-medium text-xs">
													{data.users.toLocaleString()}
												</p>
											</div>
											{isUserBar && (
												<div className="pt-1 border-t border-border">
													<span className="font-medium text-chart-1 text-xs">
														← Your performance
													</span>
												</div>
											)}
										</div>
									);
								}
								return null;
							}}
						/>
						<Bar dataKey="percentage" radius={[2, 2, 0, 0]}>
							{runtimeData.map((entry, index) => (
								<Cell
									key={`cell-${entry.runtime}`}
									fill={
										index === userRuntimeIndex
											? "var(--chart-1)"
											: `var(--chart-2)`
									}
									stroke={
										index === userRuntimeIndex
											? "var(--chart-2)"
											: "transparent"
									}
									strokeDasharray={4}
									strokeDashoffset={4}
									strokeWidth={index === userRuntimeIndex ? 2 : 0}
									fillOpacity={index === userRuntimeIndex ? 1 : 0.8}
								/>
							))}
							<LabelList content={renderCustomLabel} />
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</ChartContainer>
			<Alert className="bg-primary/10 border-primary text-primary">
				<Info />
				<AlertTitle>Congratulation on solving the problem !</AlertTitle>
				<AlertDescription>
					To see the detail feedback of your submission, please check the "Code
					Review" panel.
				</AlertDescription>
			</Alert>
		</div>
	);
};
