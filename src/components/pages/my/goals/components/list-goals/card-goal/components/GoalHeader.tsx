import { GoalListApiInterface } from "@/src/core/api/goal/goal-api";
import { ReactNode } from "react";

interface GoalHeaderProps {
    goal: GoalListApiInterface;
    statusBadge: ReactNode;
    actionsDropdown: ReactNode;
}

export default function GoalHeader({ goal, statusBadge, actionsDropdown }: GoalHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <span className="text-3xl">{goal.icon}</span>
                <div>
                    <div className="text-lg font-semibold text-slate-900">{goal.name}</div>
                    <div className="text-sm text-slate-600">{goal.description}</div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {statusBadge}
                {actionsDropdown}
            </div>
        </div>
    );
}
