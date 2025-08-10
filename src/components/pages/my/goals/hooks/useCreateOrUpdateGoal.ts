import { GoalCreateApiInterface } from "@/src/core/api/goal/goal-api";
import GoalCreateOrUpdateService from "@/src/core/api/goal/GoalCreateOrUpdateService";
import { useState } from "react";

export default function useCreateOrUpdateGoal() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const create = async (body: GoalCreateApiInterface, success: () => void) => {
        setLoading(true)
        try {
            const service = (new GoalCreateOrUpdateService());
            await service.__invoke(body);
            success();
        } catch (error) {
            setError('Error al crear o actualizar la meta');
        }
        setLoading(false);
    }

    return { loading, create, error }
}
