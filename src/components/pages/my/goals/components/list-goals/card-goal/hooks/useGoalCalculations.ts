import { GoalListApiInterface } from "@/src/core/api/goal/goal-api";

export const useGoalCalculations = (goal: GoalListApiInterface) => {
    const percentage = (goal.totalContributions / goal.goalAmount) * 100;
    const remaining = goal.goalAmount - goal.totalContributions;
    const daysUntilDeadline = Math.ceil(
        (new Date(goal.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    const isCompleted = percentage >= 100;
    const isOverdue = daysUntilDeadline < 0;
    const isExpiringSoon = daysUntilDeadline <= 7 && daysUntilDeadline > 0;

    const getDeadlineText = () => {
        if (daysUntilDeadline > 0) {
            return `${daysUntilDeadline} días restantes`;
        } else if (daysUntilDeadline === 0) {
            return "Vence hoy";
        } else {
            return `Venció hace ${Math.abs(daysUntilDeadline)} días`;
        }
    };

    const getProgressText = () => {
        return isCompleted ? "¡Meta alcanzada!" : `${remaining.toFixed(2)} restante`;
    };

    return {
        percentage,
        remaining,
        daysUntilDeadline,
        isCompleted,
        isOverdue,
        isExpiringSoon,
        getDeadlineText,
        getProgressText
    };
};
