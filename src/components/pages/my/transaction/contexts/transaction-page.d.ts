import { ReactNode } from "react";
import { TransactionListApiInterface } from "@/src/core/api/transaction/transaction-api";

export type TransactionPageContextType = {
    transactions: TransactionListApiInterface[];
    loadingListTransaction: boolean;
    listTransaction: () => void;
}

export type TransactionPageProviderProps = {
    children: ReactNode;
}