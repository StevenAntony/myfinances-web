import { ReactNode } from "react";
import { TransactionListApiInterface } from "@/src/core/api/transaction/transaction-api";
import FilterTransactionInterface from "../interfaces/filter-transaction";

export type TransactionPageContextType = {
    transactions: TransactionListApiInterface[];
    filteredTransactions: TransactionListApiInterface[];
    loadingListTransaction: boolean;
    listTransaction: () => void;
    filter: FilterTransactionInterface;
    setFilter: (filter: FilterTransactionInterface) => void;
    clearFilters: () => void;
}

export type TransactionPageProviderProps = {
    children: ReactNode;
}