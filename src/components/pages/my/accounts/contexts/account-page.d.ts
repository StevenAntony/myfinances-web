import { AccountCreateApiInterface } from "@/src/core/api/account/account-api";
import { ReactNode } from "react";
import CardAccountInterface from "../interfaces/card-account";

export type AccountPageContextType = {
    isOpenForm: boolean;
    closeForm: () => void;
    openForm: () => void;

    create: ( category: AccountCreateApiInterface, success: (success: boolean) => void, accountId?: number ) => void;
    loadingSaveAccount: boolean;

    accounts: CardAccountInterface[];
    loadingListAccount: boolean;
    refreshAccounts: () => void;
    
    selectedAccount: CardAccountInterface | null;
    setSelectedAccount: (account: CardAccountInterface | null) => void;
}

export type AccountPageProviderProps = {
    children: ReactNode;
}