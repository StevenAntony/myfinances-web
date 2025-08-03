import { AccountCreateApiInterface } from "@/src/core/api/account/account-api";
import { ReactNode } from "react";
import CardAccountInterface from "../interfaces/card-account";

export type AccountPageContextType = {
    isOpenForm: boolean;
    closeForm: () => void;
    openForm: () => void;

    create: ( category: AccountCreateApiInterface, success: () => void ) => void;
    loadingSaveAccount: boolean;

    accounts: CardAccountInterface[];
    loadingListAccount: boolean;
}

export type AccountPageProviderProps = {
    children: ReactNode;
}