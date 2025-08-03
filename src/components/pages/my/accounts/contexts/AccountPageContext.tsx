'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { AccountPageContextType, AccountPageProviderProps } from "./account-page";
import useCreateOrUpdateAccount from "../hooks/useCreateOrUpdateAccount";
import useListAccount from "../hooks/useListAccount";
const AccountPageContext = createContext<AccountPageContextType | undefined>(undefined);

export const AccountPageProvider = ({ children }: AccountPageProviderProps) => {
    const [isOpenForm, setOpenForm] = useState<boolean>(false);
    const { create, loading: loadingSaveAccount } = useCreateOrUpdateAccount();
    const { list, accounts, loading: loadingListAccount } = useListAccount();

    const closeForm = () => {
        setOpenForm(false);
    }

    const openForm = () => {
        setOpenForm(true);
    }

    const contextValue: AccountPageContextType = {
        isOpenForm,
        closeForm,
        openForm,

        create,
        loadingSaveAccount,

        accounts,
        loadingListAccount,
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