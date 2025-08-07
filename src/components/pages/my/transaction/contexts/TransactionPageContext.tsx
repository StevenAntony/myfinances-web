'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { TransactionPageContextType, TransactionPageProviderProps } from "./transaction-page";
import useListCategory from "@/src/components/pages/my/categories/hooks/useListCategory";
import { CategoryListApiInterface } from "@/src/core/api/category/category-api";
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