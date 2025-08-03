'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { AccountPageContextType, AccountPageProviderProps } from "./account-page";
import useCreateOrUpdateAccount from "../hooks/useCreateOrUpdateAccount";
const AccountPageContext = createContext<AccountPageContextType | undefined>(undefined);

export const AccountPageProvider = ({ children }: AccountPageProviderProps) => {
    const [isOpenForm, setOpenForm] = useState<boolean>(false);
    const { create, loading: loadingSaveAccount } = useCreateOrUpdateAccount();

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
    };


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