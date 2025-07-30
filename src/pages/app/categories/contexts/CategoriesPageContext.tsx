'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { CategoriesPageContextType, CategoriesPageProviderProps } from "./categories-page";
import useCreateOrUpdateCategory from "../hooks/useCreateOrUpdateCategory";
import useListCategory from "../hooks/useListCategory";
import useDeleteCategory from "../hooks/useDeleteCategory";

const CategoriesPageContext = createContext<CategoriesPageContextType | undefined>(undefined);

export const CategoriesPageProvider = ({ children }: CategoriesPageProviderProps) => {
    const [isOpenForm, setOpenForm] = useState<boolean>(false);
    const { createOrUpdateCategory, loading: loadingSaveCategory } = useCreateOrUpdateCategory();
    const { categories, loading: loadingListCategory, listCategory } = useListCategory();
    const { deleteCategory, loading: loadingDeleteCategory } = useDeleteCategory();

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

        createOrUpdateCategory,
        loadingSaveCategory,

        categories, 
        loadingListCategory,
        listCategory,

        deleteCategory,
        loadingDeleteCategory,
    };

    useEffect(() => {
        listCategory();
    }, [])

    useEffect(() => {
        console.log('Se actualizo la categoria');
        
    }, [categories])

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