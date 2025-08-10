import { Progress } from "antd";
import { GoalListApiInterface } from "@/src/core/api/goal/goal-api";
import formatCurrency from "@/src/utils/shared/formats/formatCurrency";

interface GoalProgressProps {
    goal: GoalListApiInterface;
    percentage: number;
    remaining: number;
    isCompleted: boolean;
    progressText: string;
}

export default function GoalProgress({ 
    goal, 
    percentage, 
    remaining, 
    isCompleted, 
    progressText 
}: GoalProgressProps) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-sm text-slate-500">Ahorrado</p>
                    <p className={`text-2xl font-bold ${isCompleted ? "text-emerald-600" : "text-slate-900"}`}>
                        {formatCurrency(goal.totalContributions)}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-slate-500">Meta</p>
                    <p className="text-lg font-semibold text-slate-700">
                        {formatCurrency(goal.goalAmount)}
                    </p>
                </div>
            </div>

            <div>
                <div className="flex justify-between text-xs text-slate-500 mb-2">
                    <span>{percentage.toFixed(1)}% completado</span>
                    <span>{progressText}</span>
                </div>
                <Progress 
                    percent={Math.min(percentage, 100)} 
                    className="h-3"
                    strokeColor={isCompleted ? "#10b981" : "#3b82f6"}
                />
            </div>
        </div>
    );
}
