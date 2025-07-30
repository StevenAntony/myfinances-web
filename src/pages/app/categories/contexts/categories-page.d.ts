import { CategoryCreateApiInterface } from "@/src/core/api/category/category-api";
import { ReactNode } from "react";
import CardCategoryInterface from "../interfaces/card-category";

export type CategoriesPageContextType = {
    isOpenForm: boolean;
    closeForm: () => void;
    openForm: () => void;

    createOrUpdateCategory: ( category: CategoryCreateApiInterface, success: () => void ) => void;
    loadingSaveCategory: boolean;

    categories: CardCategoryInterface[];
    loadingListCategory: boolean;
    listCategory: () => void;
}

export type CategoriesPageProviderProps = {
    children: ReactNode;
}