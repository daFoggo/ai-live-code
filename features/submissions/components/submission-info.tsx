"use client";

import { BookOpenCheck, ChartColumnStacked, SearchCode } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Scroller } from "@/components/ui/scroller";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {CodeReviewContent} from "./code-review-content";
import { OverviewContent } from "./overview-content";

export const SubmissionInfo = () => {
	return (
		<Card className="mx-3 sm:my-0 mt-2 sm:mr-6 mb-3 sm:ml-0 h-full">
			<Tabs defaultValue="overview">
				<CardHeader>
					<Scroller>
						<TabsList>
							<TabsTrigger value="overview">
								<ChartColumnStacked />
								Overview
							</TabsTrigger>
							<TabsTrigger value="code-review">
								<SearchCode />
								Code Review
							</TabsTrigger>
							<TabsTrigger value="editorial">
								<BookOpenCheck />
								Editorial
							</TabsTrigger>
						</TabsList>
					</Scroller>
				</CardHeader>
				<CardContent className="flex-1 h-full">
					<TabsContent value="overview">
						<Scroller
							className="h-auto max-h-[33rem] sm:max-h-[35rem]"
							withNavigation
							hideScrollbar
						>
							<OverviewContent />
						</Scroller>
					</TabsContent>

					<TabsContent value="code-review">
						<Scroller
							className="h-auto max-h-[33rem] sm:max-h-[35rem]"
							withNavigation
							hideScrollbar
						>
							<CodeReviewContent />
						</Scroller>
					</TabsContent>

					<TabsContent value="editorial">
						<Scroller
							className="h-auto max-h-[33rem] sm:max-h-[35rem]"
							withNavigation
							hideScrollbar
						></Scroller>
					</TabsContent>
				</CardContent>
			</Tabs>
		</Card>
	);
};
