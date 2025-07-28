'use client'
import { createContext, useContext, useState } from "react";
import { CategoriesPageContextType, CategoriesPageProviderProps } from "./categories-page";

type Props = {}

const CategoriesPageContext = createContext<CategoriesPageContextType | undefined>(undefined);

export const CategoriesPageProvider = ({ children }: CategoriesPageProviderProps) => {
    const [isOpenForm, setOpenForm] = useState<boolean>(false);

    const closeForm = () => {
        setOpenForm(false);
    }

    const openForm = () => {
        setOpenForm(true);
    }

    const contextValue: CategoriesPageContextType = {
        isOpenForm,
        closeForm,
        openForm,
    };

    return (
        <CategoriesPageContext.Provider value={contextValue}>
            {children}
        </CategoriesPageContext.Provider>
    );
}

export const useCategoriesPageContext = (): CategoriesPageContextType => {
    const context = useContext(CategoriesPageContext);
    if (context === undefined) {
        throw new Error('useCategoriesPageContext must be used within a CategoriesPageProvider');
    }
    return context;
};