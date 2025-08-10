import { CalendarOutlined } from "@ant-design/icons";
import { GoalListApiInterface } from "@/src/core/api/goal/goal-api";

interface GoalDeadlineProps {
    goal: GoalListApiInterface;
    daysUntilDeadline: number;
    deadlineText: string;
    isOverdue: boolean;
    isExpiringSoon: boolean;
}

export default function GoalDeadline({ 
    goal, 
    daysUntilDeadline, 
    deadlineText, 
    isOverdue, 
    isExpiringSoon 
}: GoalDeadlineProps) {
    const getDeadlineColor = () => {
        if (isOverdue) return "text-red-600";
        if (isExpiringSoon) return "text-orange-600";
        return "text-slate-500";
    };

    return (
        <div className="flex items-center justify-between text-sm">
            <div className={`flex items-center gap-1 ${getDeadlineColor()}`}>
                <CalendarOutlined className="w-3 h-3" />
                <span>{deadlineText}</span>
            </div>
            <span className="text-slate-600">
                {new Date(goal.date).toLocaleDateString('es-ES')}
            </span>
        </div>
    );
}
