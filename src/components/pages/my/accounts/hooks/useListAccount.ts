import { useState } from "react";
import CardAccountInterface from "../interfaces/card-account";
import AccountListService from "@/src/core/api/account/AccountListService";

/**
 * 
 * => Hook usardo fuera de la pagina
 *  -> Page > Transacctions > FormTransactions
 *  -> Page > Transacctions > FilterTransaction
 *  -> Page > Dashboard
 */
export default function useListAccount() {
    const [accounts, setAccounts] = useState<CardAccountInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    // const [error, setError] = useState<string | null>(null);

    const list = async () => {
        setLoading(true)
        const service = (new AccountListService());
        await service.__invoke();
        const transformData: CardAccountInterface[]  = service.data.map(item => {
            return {
                id: item.id,
                name: item.name,
                type: item.type,
                accountNumber: item.accountNumber ?? '--',
                balance: item.balance ?? 0,
                bank: item.bank ?? '--',
                color: 'red',
                creditLimit: item.creditLimit ?? 0
            }
        });
        setAccounts(transformData);
        
        setLoading(false);
    }

    return { loading, list, accounts }
}