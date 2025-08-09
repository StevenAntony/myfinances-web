'use client'
import { createContext, useContext, useState } from "react";
import { GoalPageContextType, GoalPageProviderProps } from "./goal-page";

const GoalPageContext = createContext<GoalPageContextType | undefined>(undefined);

export const GoalPageProvider = ({ children }: GoalPageProviderProps) => {
    const [isOpenForm, setOpenForm] = useState<boolean>(false);

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