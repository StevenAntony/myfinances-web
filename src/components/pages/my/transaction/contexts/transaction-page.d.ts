import { AccountCreateApiInterface } from "@/src/core/api/account/account-api";
import { ReactNode } from "react";
import { CategoryListApiInterface } from "@/src/core/api/category/category-api";

export type TransactionPageContextType = {
    categories: CategoryListApiInterface[];
    loadingListCategory: boolean;
}

export type TransactionPageProviderProps = {
    children: ReactNode;
}