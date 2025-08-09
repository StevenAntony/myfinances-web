'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { DashboardPageContextType, DashboardPageProviderProps } from "./dashboard-page";
import useListAccount from "../../accounts/hooks/useListAccount";
import useMonthlySummary from "../hooks/useMonthlySummary";
import useListTransaction from "../../transaction/hooks/useListTransaction";

const DashboardPageContext = createContext<DashboardPageContextType | undefined>(undefined);

export const DashboardPageProvider = ({ children }: DashboardPageProviderProps) => {
    const { list: listAccounts, accounts, loading: loadingListAccount  } = useListAccount();
    const { listTransaction, transactions, loading: loadingListTransaction } = useListTransaction();
    const { listMonthlySummary, data: monthlySummary, loading: loadingMonthlySummary, error: errorMonthlySummary } = useMonthlySummary();

    const contextValue: DashboardPageContextType = {
        monthlySummary,
        loadingMonthlySummary,
        errorMonthlySummary,

        accounts,
        loadingAccounts: loadingListAccount,

        loadingListTransaction,
        transactions,
    };

    const runDashboard = async () => {
        await listAccounts();
        await listTransaction();
    }

    useEffect(() => {
        listMonthlySummary( 
            new Date().getMonth() + 1, 
            new Date().getFullYear(),
            accounts
        );
    }, [accounts])

    useEffect(() => {
        runDashboard();
    }, [])

    return (
        <DashboardPageContext.Provider value={contextValue}>
            {children}
        </DashboardPageContext.Provider>
    );
}

export const useDashboardPageContext = (): DashboardPageContextType => {
    const context = useContext(DashboardPageContext);
    if (context === undefined) {
        throw new Error('useDashboardPageContext must be used within a DashboardPageProvider');
    }
    return context;
};