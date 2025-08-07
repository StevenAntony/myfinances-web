import { TransactionCreateApiInterface } from "@/src/core/api/transaction/transaction-api";
import TransactionCreateService from "@/src/core/api/transaction/TransactionCreateService";
import { useState } from "react";

export default function useCreateTransaction() {
    const [loading, setLoading] = useState<boolean>(false);
    // const [error, setError] = useState<string | null>(null);

    const create = async (body: TransactionCreateApiInterface, success: () => void) => {
        setLoading(true)
        const service = (new TransactionCreateService());
        await service.__invoke(body);
        success();
        setLoading(false);
    }

    return { loading, create }
}