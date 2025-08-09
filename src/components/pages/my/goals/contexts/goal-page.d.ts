import { ReactNode } from "react";

export type GoalPageContextType = {
    isOpenForm: boolean;
    closeForm: () => void;
    openForm: () => void;
}

export type GoalPageProviderProps = {
    children: ReactNode;
}