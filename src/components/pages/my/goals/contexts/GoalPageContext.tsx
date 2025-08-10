'use client'
import { createContext, useContext, useState } from "react";
import { GoalPageContextType, GoalPageProviderProps } from "./goal-page";
import useCreateOrUpdateGoal from "../hooks/useCreateOrUpdateGoal";

const GoalPageContext = createContext<GoalPageContextType | undefined>(undefined);

export const GoalPageProvider = ({ children }: GoalPageProviderProps) => {
    const [isOpenForm, setOpenForm] = useState<boolean>(false);
    const { create, loading: loadingCreate, error: errorCreate } = useCreateOrUpdateGoal();

    const closeForm = () => {
        setOpenForm(false);
    }

    const openForm = () => {
        setOpenForm(true);
    }

    const contextValue: GoalPageContextType = {
        isOpenForm,
        closeForm,
        openForm,
        create,
        loadingCreate,
        errorCreate
    }

    return (
        <GoalPageContext.Provider value={contextValue}>
            {children}
        </GoalPageContext.Provider>
    );

}

export const useGoalPageContext = (): GoalPageContextType => {
    const context = useContext(GoalPageContext);
    if (context === undefined) {
        throw new Error("useGoalPageContext must be used within a GoalPageProvider");
    }
    return context;
}