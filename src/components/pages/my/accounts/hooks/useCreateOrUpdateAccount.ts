import { AccountCreateApiInterface } from "@/src/core/api/account/account-api";
import AccountCreateOrUpdateService from "@/src/core/api/account/AccountCreateOrUpdateService";
import { useState } from "react";

export default function useCreateOrUpdateAccount() {
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState<string | null>(null);

    const create = async (body: AccountCreateApiInterface, callback: (success: boolean) => void, accountId?: number) => {
        setLoading(true)
        const service = (new AccountCreateOrUpdateService());
        await service.__invoke(body, accountId);
        callback(service.success);
        setLoading(false);
    }

    return { loading, create }
}