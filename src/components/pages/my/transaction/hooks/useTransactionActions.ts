'use client'
import { useState } from 'react';
import { message } from 'antd';
import { TransactionDeleteService } from '@/src/core/api/transaction/TransactionDeleteService';

export default function useTransactionActions() {
    const [loading, setLoading] = useState(false);

    const deleteTransaction = async (
        transactionId: number | string, 
        description: string, 
        onSuccess?: () => void
    ) => {
        setLoading(true);
        try {
            await TransactionDeleteService.deleteTransaction(transactionId);
            message.success(`Transacción "${description}" eliminada exitosamente`);
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.error('Error deleting transaction:', error);
            message.error('Error al eliminar la transacción');
        } finally {
            setLoading(false);
        }
    };

    return {
        deleteTransaction,
        loading
    };
}
