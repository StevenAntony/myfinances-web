'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { GoalPageContextType, GoalPageProviderProps } from "./goal-page";
import useCreateOrUpdateGoal from "../hooks/useCreateOrUpdateGoal";
import useListGoal from "../hooks/useListGoal";
import useCreateContributions from "../hooks/useCreateContributions";
import { GoalListApiInterface } from "@/src/core/api/goal/goal-api";

const GoalPageContext = createContext<GoalPageContextType | undefined>(undefined);

export const GoalPageProvider = ({ children }: GoalPageProviderProps) => {
    const [isOpenForm, setOpenForm] = useState<boolean>(false);
    const [isOpenContributionForm, setOpenContributionForm] = useState<boolean>(false);
    const [selectedGoal, setSelectedGoal] = useState<GoalListApiInterface | null>(null);

    // Hooks
    const { create, loading: loadingCreate, error: errorCreate } = useCreateOrUpdateGoal();
    const { list, loading: loadingList, goals, error: errorList } = useListGoal();
    const { create: createContribution, loading: loadingContribution, error: errorContribution } = useCreateContributions()

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
        errorList,

        createContribution,
        loadingContribution,
        errorContribution,
        isOpenContributionForm,
        setOpenContributionForm,

        setSelectedGoal,
        selectedGoal,
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