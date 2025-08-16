'use client'
import PulseLoading from "@/src/components/loading/PulseLoading";
import CardTransaction from "./components/CardTransaction";
import { useTransactionPageContext } from "./contexts/TransactionPageContext";
import { TransactionListApiInterface } from "@/src/core/api/transaction/transaction-api";
import { CardTransactionInterface } from "./interfaces/card-transaction";
import { useAppContext } from "@/src/context/AppContext";
import { useEffect } from "react";

export default function ListTransaction() {
    const { 
        loadingListTransaction, 
        filteredTransactions, 
        listTransaction, 
        refreshTransactions,
        selectedTransaction,
        setSelectedTransaction 
    } = useTransactionPageContext();
    const { reloadTransaction } = useAppContext();

    const transactionTransform = (transaction: TransactionListApiInterface): CardTransactionInterface => {
        return {
            account: transaction.account.name,
            accountType: transaction.account.type,
            amount: transaction.amount,
            category: transaction.category.name,
            date: transaction.date,
            description: transaction.description,
            id: transaction.id,
            type: transaction.type
        }
    }

    const handleEdit = (transaction: CardTransactionInterface) => {
        // Find the original transaction from the API data
        const originalTransaction = filteredTransactions.find(t => t.id === transaction.id);
        if (originalTransaction) {
            setSelectedTransaction(originalTransaction);
            // TODO: Open edit form when form component is ready
        }
    };

    const handleDelete = () => {
        refreshTransactions();
    };

    useEffect(() => {
        listTransaction();
    }, [reloadTransaction])

    return (
        <div className="h-full py-4">
            <PulseLoading isLoading={loadingListTransaction}>
                {/* Responsive Grid Layout */}
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                    {filteredTransactions.length > 0 ? (
                        filteredTransactions.map(transaction => (
                            <CardTransaction 
                                transaction={transactionTransform(transaction)} 
                                key={transaction.id}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-slate-400 text-lg mb-2">📊</div>
                            <h3 className="text-slate-600 font-medium mb-1">No hay transacciones</h3>
                            <p className="text-slate-500 text-sm">
                                Las transacciones que agregues aparecerán aquí
                            </p>
                        </div>
                    )}
                </div>
            </PulseLoading>
        </div>
    )
}