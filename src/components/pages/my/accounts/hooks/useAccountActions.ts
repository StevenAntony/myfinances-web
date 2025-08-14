import { useState, useEffect } from "react";
import { message } from "antd";
import AccountDeleteService from "@/src/core/api/account/AccountDeleteService";
import AccountHasTransactionsService from "@/src/core/api/account/AccountHasTransactionsService";

export default function useAccountActions() {
    const [loading, setLoading] = useState(false);
    const [hasTransactions, setHasTransactions] = useState<{ [key: number]: boolean }>({});

    const checkAccountTransactions = async (accountId: number) => {
        const service = new AccountHasTransactionsService();
        await service.__invoke(accountId);
        
        if (service.success) {
            setHasTransactions(prev => ({
                ...prev,
                [accountId]: Array.isArray(service.data) ? service.data[0] : Boolean(service.data)
            }));
        }
    };

    const deleteAccount = async (accountId: number, accountName: string, onSuccess: () => void) => {
        setLoading(true);
        
        try {
            const service = new AccountDeleteService();
            await service.__invoke(accountId);
            
            if (service.success) {
                message.success(`Cuenta "${accountName}" eliminada exitosamente`);
                onSuccess();
            } else {
                message.error('Error al eliminar la cuenta');
            }
        } catch (error) {
            message.error('Error al eliminar la cuenta');
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        hasTransactions,
        checkAccountTransactions,
        deleteAccount
    };
}
