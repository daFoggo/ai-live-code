"use client";

import { ChevronRight, Code, ExternalLink, FileText, Play } from "lucide-react";
import Link from "next/link";
import YouTube from "react-youtube";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SAMPLE_COURSES } from "@/features/courses/utils/data";
import type { ISession } from "../utils/types";

export const SessionDetail = () => {
	const session: ISession = SAMPLE_COURSES.chapters[0].sessions[1];

	const getYouTubeVideoId = (url: string) => {
		const match = url.match(
			/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
		);
		return match ? match[1] : null;
	};

	const videoId = session.videoUrl ? getYouTubeVideoId(session.videoUrl) : null;

	const availableTabs = [
		{
			id: "video",
			label: "Video",
			icon: Play,
			available: !!session.videoUrl,
			type: "content",
		},
		{
			id: "materials",
			label: "Materials",
			icon: FileText,
			available: !!session.materialsUrl,
			type: "external",
			url: session.materialsUrl,
		},
		{
			id: "practice",
			label: "Go To Practice",
			icon: Code,
			available: !!session.practiceUrl,
			type: "internal",
			url: session.practiceUrl,
		},
	].filter((tab) => tab.available);

	return (
		<div className="w-full min-h-screen">
			<div className="bg-card border-b">
				<div className="mx-auto px-4 sm:px-6 max-w-7xl">
					{/* Course breadcrumb - improved mobile responsiveness */}
					<nav className="flex items-center space-x-1 sm:space-x-2 py-3 overflow-x-auto text-muted-foreground text-xs sm:text-sm">
						<Link
							href="/course/introduction-to-programming-with-python"
							className="hover:text-foreground whitespace-nowrap transition-colors"
						>
							Python Introduction
						</Link>
						<ChevronRight className="flex-shrink-0 size-3 sm:size-4" />
						<span className="font-medium text-foreground truncate">
							{session.name}
						</span>
					</nav>

					{/* Session titles - improved mobile typography and spacing */}
					<div className="space-y-3 py-4">
						<div>
							<h1 className="font-semibold text-lg sm:text-xl lg:text-2xl leading-tight">
								{session.name}
							</h1>
							<p className="mt-1 text-muted-foreground text-xs sm:text-sm">
								Chapter 1: Getting Started
							</p>
						</div>

						{/* Navigation buttons - moved below titles, unified layout for all screen sizes */}
						<div className="flex flex-wrap gap-2 sm:gap-3">
							{availableTabs.map((tab) => {
								const Icon = tab.icon;

								if (tab.type === "external") {
									return (
										<Button
											key={tab.id}
											variant="outline"
											size="sm"
											className="gap-2 bg-transparent text-xs sm:text-sm"
											onClick={() => window.open(tab.url, "_blank")}
										>
											<Icon className="size-3 sm:size-4" />
											<span className="hidden xs:inline">{tab.label}</span>
											<span className="xs:hidden">Materials</span>
											<ExternalLink className="size-3 sm:size-4" />
										</Button>
									);
								}

								if (tab.type === "internal") {
									return (
										<Button
											key={tab.id}
											asChild
											size="sm"
											className="text-xs sm:text-sm"
										>
											<Link href={tab.url || "#"} className="gap-2">
												<span className="hidden xs:inline">{tab.label}</span>
												<span className="xs:hidden">Go to practice</span>
												<ChevronRight className="size-3 sm:size-4" />
											</Link>
										</Button>
									);
								}
							})}
						</div>
					</div>
				</div>
			</div>

			<main className="mx-auto px-4 sm:px-6 py-6 max-w-7xl">
				<div className="space-y-6">
					{/* Video Content */}
					{session.videoUrl && (
						<Card className="p-0 overflow-hidden">
							<div className="w-full aspect-video">
								{videoId ? (
									<YouTube
										videoId={videoId}
										className="w-full h-full"
										iframeClassName="w-full h-full rounded-lg"
										opts={{
											width: "100%",
											height: "100%",
											playerVars: {
												autoplay: 0,
												modestbranding: 1,
												rel: 0,
												controls: 1,
											},
										}}
									/>
								) : (
									<div className="flex justify-center items-center bg-muted rounded-lg w-full h-full">
										<div className="space-y-3 text-center">
											<Play className="mx-auto w-16 h-16 text-muted-foreground" />
											<div>
												<p className="font-medium text-lg">
													Video not available
												</p>
												<p className="text-muted-foreground text-sm">
													This session doesn't have video content yet
												</p>
											</div>
										</div>
									</div>
								)}
							</div>
						</Card>
					)}

					{session.description && (
						<Card>
							<CardHeader>
								<CardTitle>About This Session</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground leading-relaxed">
									{session.description}
								</p>
							</CardContent>
						</Card>
					)}
				</div>
			</main>
		</div>
	);
};
