'use client'
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { TransactionPageContextType, TransactionPageProviderProps } from "./transaction-page";
import useListTransaction from "../hooks/useListTransaction";
import FilterTransactionInterface from "../interfaces/filter-transaction";
import { ProcessType } from "@/src/utils/consts/ProcessType";

const TransactionPageContext = createContext<TransactionPageContextType | undefined>(undefined);

export const TransactionPageProvider = ({ children }: TransactionPageProviderProps) => {
    const [isOpenForm, setOpenForm] = useState<boolean>(false);
    const { listTransaction, loading: loadingListTransaction, transactions } = useListTransaction();
    
    const [filter, setFilter] = useState<FilterTransactionInterface>({
        type: null,
        account: null,
        category: null,
        search: '',
    });

    // Lógica de filtrado
    const filteredTransactions = useMemo(() => {
        return transactions.filter(transaction => {
            // Filtro por tipo de transacción
            if (filter.type && transaction.type !== filter.type) {
                return false;
            }

            // Filtro por cuenta
            if (filter.account && transaction.account.id.toString() !== filter.account) {
                return false;
            }

            // Filtro por categoría
            if (filter.category && transaction.category.id?.toString() !== filter.category) {
                return false;
            }

            // Filtro por búsqueda en descripción
            if (filter.search && !transaction.description.toLowerCase().includes(filter.search.toLowerCase())) {
                return false;
            }

            return true;
        });
    }, [transactions, filter]);

    const clearFilters = () => {
        setFilter({
            type: null,
            account: null,
            category: null,
            search: '',
        });
    };

    const closeForm = () => {
        setOpenForm(false);
    }

    const openForm = () => {
        setOpenForm(true);
    }

    const contextValue: TransactionPageContextType = {
        transactions,
        filteredTransactions,
        loadingListTransaction,
        listTransaction,
        filter,
        setFilter,
        clearFilters,
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