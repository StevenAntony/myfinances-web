import { ReactNode } from "react";

export type CategoriesPageContextType = {
    isOpenForm: boolean;
    closeForm: () => void;
    openForm: () => void;
}

export type CategoriesPageProviderProps = {
    children: ReactNode;
}