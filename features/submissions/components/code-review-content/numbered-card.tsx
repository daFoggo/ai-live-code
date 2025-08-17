import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { generateId } from "@/lib/utils/id"
import { cn } from "@/lib/utils/tailwind"

interface INumberedCard {
    index: number
    content: string
    codeLine?: number
    keyPrefix: string
    className?: string
}

export const NumberedCard = ({ content, index, className, codeLine }: INumberedCard) => (
    <Card key={generateId()} className={cn("p-2 text-xs", className)}>
        <div className="flex sm:flex-row flex-col sm:justify-between sm:items-start gap-2">
            <div className="flex flex-1 items-start gap-2 min-w-0">
                <span className="flex-shrink-0 font-medium text-xs">{index + 1}.</span>
                <span className="mb-0 min-w-0 text-xs break-words">{content}</span>
            </div>
            {codeLine && (
                <div className="flex-shrink-0 self-start sm:self-start">
                    <Badge variant="outline" className="text-xs">
                        Line {codeLine}
                    </Badge>
                </div>
            )}
        </div>
    </Card>
)
