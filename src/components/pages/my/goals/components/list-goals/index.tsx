'use client'
import { Tag } from "antd"
import CardGoal from "./card-goal"
import { useGoalPageContext } from "../../contexts/GoalPageContext"
import { GoalListApiInterface } from "@/src/core/api/goal/goal-api";

export default function ListGoals() {
    const { goals } = useGoalPageContext();

    const getStatusBadge = (goal: GoalListApiInterface) => {
        const percentage = (goal.totalContributions / goal.goalAmount) * 100
        const daysUntilDeadline = Math.ceil(
            (new Date(goal.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
        )

        if (percentage >= 100) {
            return <Tag color="success">Completado</Tag>
        } else if (daysUntilDeadline < 0) {
            return <Tag color="error">Vencido</Tag>
        } else if (daysUntilDeadline < 30) {
            return <Tag color="warning">Próximo a vencer</Tag>
        } else {
            return <Tag color="blue">En progreso</Tag>
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal) => <CardGoal key={goal.id} goal={goal} getStatusBadge={getStatusBadge} />)}
        </div>
    )
}