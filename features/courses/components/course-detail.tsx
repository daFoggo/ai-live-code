"use client";

import { useUser } from "@clerk/nextjs";
import { ChevronDown, ChevronRight, Clock, Play } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import PageHeading from "@/components/common/page-heading";
import { PageLoading } from "@/components/common/page-loading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import type { ISession } from "@/features/sessions";
import { SAMPLE_COURSES } from "../utils/data";
import type { IChapter } from "../utils/types";

export const CourseDetail = () => {
	const { isSignedIn, user, isLoaded } = useUser();
	const [openChapters, setOpenChapters] = useState<Set<string>>(
		new Set([SAMPLE_COURSES.chapters[0]?.id]),
	);

	if (!isLoaded) {
		return <PageLoading variant="dots" text="Loading course details..." />;
	}

	const CustomTitle = () => {
		return (
			<div className="flex flex-col gap-2">
				<p className="font-semibold text-xl">Hello {isSignedIn ? user.firstName : ""}! 🙌</p>
				<p className="font-bold text-2xl">
					Welcome back to{" "}
					<span className="text-primary">{SAMPLE_COURSES.name}</span>
				</p>
			</div>
		);
	};

	const toggleChapter = (chapterId: string) => {
		const newOpenChapters = new Set(openChapters);
		if (newOpenChapters.has(chapterId)) {
			newOpenChapters.delete(chapterId);
		} else {
			newOpenChapters.add(chapterId);
		}
		setOpenChapters(newOpenChapters);
	};

	const formatDuration = (minutes: number) => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		if (hours > 0) {
			return `${hours}h ${mins}m`;
		}
		return `${mins}m`;
	};

	const getTotalChapterDuration = (sessions: ISession[]) => {
		return sessions.reduce(
			(total: number, session: ISession) => total + session.duration,
			0,
		);
	};

	return (
		<div className="flex flex-col gap-6 p-2 sm:p-6">
			<PageHeading
				title={SAMPLE_COURSES.name}
				customTitleComponent={<CustomTitle />}
			/>

			<Separator />

			<div className="space-y-4 dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/10 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs">
				{SAMPLE_COURSES.chapters.map(
					(chapter: IChapter, chapterIndex: number) => {
						const isOpen = openChapters.has(chapter.id);
						const totalDuration = getTotalChapterDuration(chapter.sessions);

						return (
							<Card key={chapter.id} className="overflow-hidden">
								<Collapsible
									open={isOpen}
									onOpenChange={() => toggleChapter(chapter.id)}
								>
									<CollapsibleTrigger asChild>
										<CardHeader className="hover:bg-muted/50 transition-colors cursor-pointer">
											<div className="flex justify-between items-center">
												<div className="flex sm:flex-row flex-col items-start gap-4 p-2">
													<div className="flex items-center gap-2">
														{isOpen ? (
															<ChevronDown className="size-5 text-muted-foreground" />
														) : (
															<ChevronRight className="size-5 text-muted-foreground" />
														)}
														<Badge variant="outline" className="font-mono">
															Chapter{" "}
															{String(chapterIndex + 1).padStart(2, "0")}
														</Badge>
													</div>
													<div>
														<p className="font-medium text-lg">
															{chapter.name}
														</p>
														<div className="flex items-center gap-4 text-muted-foreground text-sm">
															<span>{chapter.sessions.length} sessions</span>
															<div className="flex items-center gap-1">
																<Clock className="size-4" />
																<span>{formatDuration(totalDuration)}</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</CardHeader>
									</CollapsibleTrigger>

									<CollapsibleContent>
										<CardContent className="pt-0">
											<div className="space-y-2">
												{chapter.sessions.map(
													(session: ISession, sessionIndex: number) => (
														<Link
															key={session.id}
															href={`/course/${SAMPLE_COURSES.id}/session/${session.id}`}
															className="block"
														>
															<div className="group flex items-center gap-4 hover:bg-muted/50 p-4 rounded-lg transition-colors">
																<div className="flex flex-1 items-center gap-4">
																	<div className="flex items-center gap-2">
																		<Badge
																			variant="secondary"
																			className="font-mono text-xs"
																		>
																			{String(sessionIndex + 1).padStart(
																				2,
																				"0",
																			)}
																		</Badge>
																		{session.videoUrl && (
																			<Play className="size-4 text-primary" />
																		)}
																	</div>
																	<div className="flex-1">
																		<h4 className="font-medium group-hover:text-primary hover:underline transition-colors">
																			{session.name}
																		</h4>
																	</div>
																</div>
																<div className="flex items-center gap-1 text-muted-foreground text-sm">
																	<Clock className="size-4" />
																	<span>
																		{formatDuration(session.duration)}
																	</span>
																</div>
															</div>
														</Link>
													),
												)}
											</div>
										</CardContent>
									</CollapsibleContent>
								</Collapsible>
							</Card>
						);
					},
				)}
			</div>
		</div>
	);
};
