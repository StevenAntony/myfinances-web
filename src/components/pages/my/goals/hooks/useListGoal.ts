import { GoalListApiInterface } from "@/src/core/api/goal/goal-api";
import GoalListService from "@/src/core/api/goal/GoalListService";
import { useState } from "react";

export default function useListGoal() {
    const [goals, setGoals] = useState<Array<GoalListApiInterface>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const list = async () => {
        setLoading(true)
        try {
            const service = (new GoalListService());
            await service.__invoke();
            const goalsDraft = service.data.map((goal) => {
                return {
                    ...goal,
                    totalContributions: goal.contributions.reduce((total, contribution) => total + contribution.amount, 0)
                }
            })
            setGoals(goalsDraft);
        } catch (error) {
            setError('Error al listar las metas');
        }
        setLoading(false);
    }

    return { loading, list, goals, error }
}