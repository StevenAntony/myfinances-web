'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { TransactionPageContextType, TransactionPageProviderProps } from "./transaction-page";
import useListTransaction from "../hooks/useListTransaction";

const TransactionPageContext = createContext<TransactionPageContextType | undefined>(undefined);

export const TransactionPageProvider = ({ children }: TransactionPageProviderProps) => {
    const [isOpenForm, setOpenForm] = useState<boolean>(false);
    const { listTransaction, loading: loadingListTransaction, transactions } = useListTransaction();

    const closeForm = () => {
        setOpenForm(false);
    }

    const openForm = () => {
        setOpenForm(true);
    }

    const contextValue: TransactionPageContextType = {
        transactions,
        loadingListTransaction,
        listTransaction,
    };

    useEffect(() => {
        listTransaction();
    }, [])

    return (
        <TransactionPageContext.Provider value={contextValue}>
            {children}
        </TransactionPageContext.Provider>
    );
}

export const useTransactionPageContext = (): TransactionPageContextType => {
    const context = useContext(TransactionPageContext);
    if (context === undefined) {
        throw new Error('useAccountPageContext must be used within a AccountPageProvider');
    }
    return context;
};