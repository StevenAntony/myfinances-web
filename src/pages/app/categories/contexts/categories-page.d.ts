import { CategoryCreateApiInterface } from "@/src/core/api/category/category-api";
import { ReactNode } from "react";

export type CategoriesPageContextType = {
    isOpenForm: boolean;
    closeForm: () => void;
    openForm: () => void;

    createOrUpdateCategory: ( category: CategoryCreateApiInterface, success: () => void ) => void;
    loadingSaveCategory: boolean;
}

export type CategoriesPageProviderProps = {
    children: ReactNode;
}