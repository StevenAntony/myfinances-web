import type { TableProps } from 'antd';
import { TableTransactionInterface } from '../transaction';
import { useEffect, useState } from 'react';
import { TransactionListService } from '@/src/core/supabase/services/transactions/TransactionList.service';

type ColumnsType<T extends object = object> = TableProps<T>['columns'];

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

    const columns: ColumnsType<TableTransactionInterface> = [
        {
            title: 'Tipo',
            dataIndex: 'type',
            width: '20%',
        },
        {
            title: 'Fecha',
            dataIndex: 'date',
            width: '20%',
        },
        {
            title: 'Categoria',
            dataIndex: 'category',
            width: '20%',
        },
        {
            title: 'Tipo Pago',
            dataIndex: 'payment_type',
            width: '20%',
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            width: '20%',
        },
        {
            title: 'Monto',
            dataIndex: 'amount',
            width: '20%',
        },
    ];

    return { columns, loading, transactions }
}