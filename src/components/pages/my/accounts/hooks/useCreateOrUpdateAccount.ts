import { AccountCreateApiInterface } from "@/src/core/api/account/account-api";
import AccountCreateOrUpdateService from "@/src/core/api/account/AccountCreateOrUpdateService";
import { useState } from "react";

export default function useCreateOrUpdateAccount() {
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState<string | null>(null);

    const create = async (body: AccountCreateApiInterface, success: () => void) => {
        setLoading(true)
        const service = (new AccountCreateOrUpdateService());
        await service.__invoke(body);
        success();
        setLoading(false);
    }

    return { loading, create }
}