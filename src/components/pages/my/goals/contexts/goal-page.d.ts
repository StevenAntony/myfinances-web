import { GoalCreateApiInterface } from "@/src/core/api/goal/goal-api";
import { ReactNode } from "react";

export type GoalPageContextType = {
    isOpenForm: boolean;
    closeForm: () => void;
    openForm: () => void;

    create: (body: GoalCreateApiInterface, success: () => void) => void;
    loadingCreate: boolean;
    errorCreate: string | null;
}

export type GoalPageProviderProps = {
    children: ReactNode;
}