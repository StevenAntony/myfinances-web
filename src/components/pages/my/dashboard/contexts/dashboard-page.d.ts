import { ReactNode } from "react";
import MonthlySummaryInterface from "../interfaces/monthly-summary";
import CardAccountInterface from "../../accounts/interfaces/card-account";

export type DashboardPageContextType = {
    monthlySummary: MonthlySummaryInterface;
    loadingMonthlySummary: boolean;
    errorMonthlySummary: string | null;

    accounts: CardAccountInterface[];
    loadingAccounts: boolean;

    transactions: TransactionListApiInterface[];
    loadingListTransaction: boolean;
}

export type DashboardPageProviderProps = {
    children: ReactNode;
}