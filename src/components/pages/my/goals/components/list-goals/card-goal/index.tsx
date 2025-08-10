import { GoalListApiInterface } from "@/src/core/api/goal/goal-api";
import { Card } from "antd";
import { ReactNode } from "react";

// Hooks
import { useGoalCalculations } from "./hooks/useGoalCalculations";
import { GoalActionsProps } from "./hooks/useGoalActions";

// Components
import GoalHeader from "./components/GoalHeader";
import GoalProgress from "./components/GoalProgress";
import GoalDeadline from "./components/GoalDeadline";
import GoalActionsDropdown from "./components/GoalActionsDropdown";
import { useGoalPageContext } from "../../../contexts/GoalPageContext";

interface CardGoalProps {
    goal: GoalListApiInterface;
    getStatusBadge: (goal: GoalListApiInterface) => ReactNode;
    actions?: GoalActionsProps;
}

export default function CardGoal({ goal, getStatusBadge, actions }: CardGoalProps) {
    const {
        percentage,
        remaining,
        daysUntilDeadline,
        isCompleted,
        isOverdue,
        isExpiringSoon,
        getDeadlineText,
        getProgressText
    } = useGoalCalculations(goal);

    const { setOpenContributionForm, setSelectedGoal } = useGoalPageContext();

    // Default actions if not provided
    const defaultActions: GoalActionsProps = {
        onContribute: (goal: GoalListApiInterface) => {
            setSelectedGoal(goal);
            setOpenContributionForm(true);
        },
        onEdit: (goalId: number) => console.log('Edit goal:', goalId),
        onDelete: (goalId: number) => console.log('Delete goal:', goalId)
    };

    const goalActions = actions || defaultActions;

    return (
        <Card className="border-slate-200 hover:shadow-md transition-shadow duration-200">
            <div className="space-y-4">
                <GoalHeader 
                    goal={goal}
                    statusBadge={getStatusBadge(goal)}
                    actionsDropdown={
                        <GoalActionsDropdown 
                            goal={goal} 
                            actions={goalActions} 
                        />
                    }
                />
                
                <GoalProgress 
                    goal={goal}
                    percentage={percentage}
                    remaining={remaining}
                    isCompleted={isCompleted}
                    progressText={getProgressText()}
                />
                
                <GoalDeadline 
                    goal={goal}
                    daysUntilDeadline={daysUntilDeadline}
                    deadlineText={getDeadlineText()}
                    isOverdue={isOverdue}
                    isExpiringSoon={isExpiringSoon}
                />
            </div>
        </Card>
    )
}