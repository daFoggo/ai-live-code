import { History, LetterText } from "lucide-react";
import { MarkdownKatexRenderer } from "@/components/common/markdown-katex-renderer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Scroller } from "@/components/ui/scroller";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { IExercise } from "../utils/types";

interface IExerciseInfoProps {
	exerciseData: IExercise;
}
const ExerciseInfo = ({ exerciseData }: IExerciseInfoProps) => {
	return (
		<Card className="mx-3 mb-2 sm:mb-0 h-full">
			<Tabs defaultValue="description">
				<CardHeader>
					<TabsList>
						<TabsTrigger value="description">
							<LetterText />
							Description
						</TabsTrigger>
						<TabsTrigger value="submissions">
							<History />
							Submissions
						</TabsTrigger>
					</TabsList>
				</CardHeader>
				<CardContent className="flex-1 h-full">
					<TabsContent value="description">
						<Scroller
							className="h-auto max-h-[44rem] sm:max-h-[36rem]"
							withNavigation
							hideScrollbar
						>
							<p className="mb-2 font-semibold text-primary text-2xl">
								{exerciseData.name}
							</p>
							<MarkdownKatexRenderer content={exerciseData.statement} />
						</Scroller>
					</TabsContent>
					<TabsContent value="submissions">
						<Scroller
							className="h-auto max-h-[44rem] sm:max-h-[36rem]"
							withNavigation
							hideScrollbar
						>
							Feature not implemented yet (•_•)
						</Scroller>
					</TabsContent>
				</CardContent>
			</Tabs>
		</Card>
	);
};

export default ExerciseInfo;
