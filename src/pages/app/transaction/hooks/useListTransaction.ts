import { TableTransactionInterface } from '../transaction';
import { useEffect, useState } from 'react';
import { TransactionListService } from '@/src/core/supabase/services/transactions/TransactionList.service';

export default function useListTransaction() {
    const [transactions, setTransactions] = useState<TableTransactionInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const listTransaction = async () => {
        setLoading(true)
        const service = (new TransactionListService());
        await service.__invoke()
        setTransactions(service.data as TableTransactionInterface[])
        setLoading(false)
    }

    useEffect(() => {
        listTransaction()
    }, [])

    return { loading, transactions }
}