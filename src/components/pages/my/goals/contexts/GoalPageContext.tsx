'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { GoalPageContextType, GoalPageProviderProps } from "./goal-page";
import useCreateOrUpdateGoal from "../hooks/useCreateOrUpdateGoal";
import useListGoal from "../hooks/useListGoal";

const GoalPageContext = createContext<GoalPageContextType | undefined>(undefined);

export const GoalPageProvider = ({ children }: GoalPageProviderProps) => {
    const [isOpenForm, setOpenForm] = useState<boolean>(false);
    const { create, loading: loadingCreate, error: errorCreate } = useCreateOrUpdateGoal();
    const { list, loading: loadingList, goals, error: errorList } = useListGoal();

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
        errorCreate,
        
        list,
        loadingList,
        goals,
        errorList
    }

    useEffect(() => {
        list();
    }, [])

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