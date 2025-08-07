import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/tailwind";
import { EXERCISE_LEVEL } from "../utils/constants";

interface IExerciseLevelBadgeProps {
	level: EXERCISE_LEVEL;
	className?: string;
}

export const ExerciseLevelBadge = ({
	level,
	className,
}: IExerciseLevelBadgeProps) => {
	const getLevelConfig = (level: EXERCISE_LEVEL) => {
		switch (level) {
			case EXERCISE_LEVEL.EASY:
				return {
					text: "Dễ",
					className: "bg-green-500/10 text-green-500",
				};
			case EXERCISE_LEVEL.MEDIUM:
				return {
					text: "Trung bình",
					className: "bg-yellow-500/10 text-yellow-500",
				};
			case EXERCISE_LEVEL.HARD:
				return {
					text: "Khó",
					className: "bg-red-500/10 text-red-500",
				};
			default:
				return {
					text: level,
					className: "bg-gray-500/10 text-gray-500",
				};
		}
	};

	const config = getLevelConfig(level);

	return (
		<Badge className={cn("font-medium text-xs", config.className, className)}>
			{config.text}
		</Badge>
	);
};
