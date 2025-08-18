import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/tailwind";

interface IExerciseLevelBadgeProps {
    level: number;
    className?: string;
}

export const ExerciseLevelBadge = ({
    level,
    className,
}: IExerciseLevelBadgeProps) => {
    const getLevelConfig = (level: number) => {
        switch (level) {
            case 1:
                return {
                    text: "Easy",
                    className: "bg-green-500/10 text-green-500",
                };
            case 2:
                return {
                    text: "Medium",
                    className: "bg-yellow-500/10 text-yellow-500",
                };
            case 3:
                return {
                    text: "Hard",
                    className: "bg-red-500/10 text-red-500",
                };
            default:
                return {
                    text: `Level ${level}`,
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