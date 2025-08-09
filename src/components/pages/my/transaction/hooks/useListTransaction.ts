import { useState } from 'react';
import { TransactionListApiInterface } from '@/src/core/api/transaction/transaction-api';
import { TransactionListService } from '@/src/core/api/transaction/TransactionListService';

/**
 * 
 * => Hook usardo fuera de la pagina
 *  -> Page > Dashboard
 */
export default function useListTransaction() {
    const [transactions, setTransactions] = useState<TransactionListApiInterface[]>([]);
    const [loading, setLoading] = useState(true);

    const listTransaction = async () => {
        setLoading(true)
        const service = (new TransactionListService());
        await service.__invoke()
        setTransactions([...service.data])
        setLoading(false)
    }

    return { loading, transactions, listTransaction }
}