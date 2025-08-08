'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { AppContextType, AppProviderProps } from "./app";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: AppProviderProps) => {
    const [reloadTransaction, setReloadTransaction] = useState<boolean>(false);


    const contextValue: AppContextType = {
        reloadTransaction,
        setReloadTransaction,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAccountPageContext must be used within a AccountPageProvider');
    }
    return context;
};