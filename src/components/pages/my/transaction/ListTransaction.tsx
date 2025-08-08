'use client'
import PulseLoading from "@/src/components/loading/PulseLoading";
import CardTransaction from "./components/CardTransaction";
import { transactionsDraft } from "./draft/transactionsDraft";
import { useTransactionPageContext } from "./contexts/TransactionPageContext";
import { TransactionListApiInterface } from "@/src/core/api/transaction/transaction-api";
import { CardTransactionInterface } from "./interfaces/card-transaction";
import { useAppContext } from "@/src/context/AppContext";
import { useEffect } from "react";


export default function ListTransaction() {

    const { loadingListTransaction, transactions, listTransaction } = useTransactionPageContext();
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

    useEffect(() => {
        listTransaction();
    }, [reloadTransaction])

    return (
        <div className="h-full py-4">
            <PulseLoading isLoading={loadingListTransaction}>
                <div className="space-y-4">
                    {
                        transactions.map(transaction => <CardTransaction transaction={transactionTransform(transaction)} key={transaction.id} />)
                    }
                </div>
                {/* <Table columns={columns} dataSource={transactions} rowKey={(row) => row.id} /> */}
            </PulseLoading>
        </div>
    )
}