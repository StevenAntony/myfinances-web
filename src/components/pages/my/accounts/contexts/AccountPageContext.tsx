'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { AccountPageContextType, AccountPageProviderProps } from "./account-page";
import useCreateOrUpdateAccount from "../hooks/useCreateOrUpdateAccount";
import useListAccount from "../hooks/useListAccount";
import CardAccountInterface from "../interfaces/card-account";
const AccountPageContext = createContext<AccountPageContextType | undefined>(undefined);

export const AccountPageProvider = ({ children }: AccountPageProviderProps) => {
    const [isOpenForm, setOpenForm] = useState<boolean>(false);
    const [selectedAccount, setSelectedAccount] = useState<CardAccountInterface | null>(null);
    const { create, loading: loadingSaveAccount } = useCreateOrUpdateAccount();
    const { list, accounts, loading: loadingListAccount } = useListAccount();

    const closeForm = () => {
        setOpenForm(false);
        setSelectedAccount(null);
    }

    const openForm = () => {
        setOpenForm(true);
    }

    const refreshAccounts = () => {
        list();
    }

    const contextValue: AccountPageContextType = {
        isOpenForm,
        closeForm,
        openForm,

        create,
        loadingSaveAccount,

        accounts,
        loadingListAccount,
        refreshAccounts,
        
        selectedAccount,
        setSelectedAccount,
    };

    useEffect(() => {
        list();
    }, [])

    return (
        <AccountPageContext.Provider value={contextValue}>
            {children}
        </AccountPageContext.Provider>
    );
}

export const useAccountPageContext = (): AccountPageContextType => {
    const context = useContext(AccountPageContext);
    if (context === undefined) {
        throw new Error('useAccountPageContext must be used within a AccountPageProvider');
    }
    return context;
};