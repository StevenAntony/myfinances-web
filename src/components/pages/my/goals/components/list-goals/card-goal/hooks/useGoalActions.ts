import { GoalListApiInterface } from "@/src/core/api/goal/goal-api";

export interface GoalActionsProps {
    onContribute: (goal: GoalListApiInterface) => void;
    onEdit: (goalId: number) => void;
    onDelete: (goalId: number) => void;
}

export const useGoalActions = (goal: GoalListApiInterface, actions: GoalActionsProps) => {
    const percentage = (goal.totalContributions / goal.goalAmount) * 100;
    const daysUntilDeadline = Math.ceil(
        (new Date(goal.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    const isCompleted = percentage >= 100;

    const getMenuItems = () => [
        {
            key: 'contributation',
            label: 'Aportar',
            disabled: isCompleted,
            onClick: () => actions.onContribute(goal)
        },
        {
            key: 'edit',
            label: 'Editar',
            disabled: isCompleted || daysUntilDeadline < 0 || goal.totalContributions !== 0,
            onClick: () => actions.onEdit(goal.id)
        },
        {
            key: 'delete',
            label: 'Eliminar',
            danger: true,
            disabled: isCompleted,
            onClick: () => actions.onDelete(goal.id)
        }
    ];

    return {
        menuItems: getMenuItems()
    };
};
