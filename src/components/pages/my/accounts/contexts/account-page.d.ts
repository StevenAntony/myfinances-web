import { AccountCreateApiInterface } from "@/src/core/api/account/account-api";
import { ReactNode } from "react";

export type AccountPageContextType = {
    isOpenForm: boolean;
    closeForm: () => void;
    openForm: () => void;

    create: ( category: AccountCreateApiInterface, success: () => void ) => void;
    loadingSaveAccount: boolean;
}

export type AccountPageProviderProps = {
    children: ReactNode;
}