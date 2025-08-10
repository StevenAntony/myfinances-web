import { useState } from "react";
import ContributionsCreateService from "@/src/core/api/goal/ContributionsCreateService";
import { ContributionsCreateApiInterface } from "@/src/core/api/goal/goal-api";

export default function useCreateContributions() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const create = async (body: ContributionsCreateApiInterface, success: () => void) => {
        setLoading(true)
        try {
            const service = (new ContributionsCreateService());
            await service.__invoke(body);
            success();
        } catch (error) {
            setError('Error al crear la contribución');
        }
        setLoading(false);
    }

    return { loading, create, error }
}
