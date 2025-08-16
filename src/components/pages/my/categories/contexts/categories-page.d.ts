import { CategoryCreateApiInterface } from "@/src/core/api/category/category-api";
import { ReactNode } from "react";
import CardCategoryInterface from "../interfaces/card-category";
import type { MenuProps } from "antd";

export type CategoriesPageContextType = {
    isOpenForm: boolean;
    closeForm: () => void;
    openForm: () => void;

    createOrUpdateCategory: ( category: CategoryCreateApiInterface, success: (success: boolean) => void, categoryId?: number ) => void;
    loadingSaveCategory: boolean;

    categories: CardCategoryInterface[];
    loadingListCategory: boolean;
    listCategory: () => void;

    deleteCategory: ( id: number, succes: () => void ) => void;
    loadingDeleteCategory: boolean;

    selectedCategory: CardCategoryInterface | null;
    setSelectedCategory: ( category: CardCategoryInterface | null ) => void;

    actionsMenu: MenuProps['items'];
}

export type CategoriesPageProviderProps = {
    children: ReactNode;
}