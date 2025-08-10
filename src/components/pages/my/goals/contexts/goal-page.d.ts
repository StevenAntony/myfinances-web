import { ContributionsCreateApiInterface, GoalCreateApiInterface } from "@/src/core/api/goal/goal-api";
import { ReactNode } from "react";

export type GoalPageContextType = {
    isOpenForm: boolean;
    closeForm: () => void;
    openForm: () => void;

    create: (body: GoalCreateApiInterface, success: () => void) => void;
    loadingCreate: boolean;
    errorCreate: string | null;

    list: () => void;
    loadingList: boolean;
    goals: Array<GoalListApiInterface>;
    errorList: string | null;

    createContribution: (body: ContributionsCreateApiInterface, success: () => void) => void;
    loadingContribution: boolean;
    errorContribution: string | null;
    isOpenContributionForm: boolean;
    setOpenContributionForm: (isOpen: boolean) => void;

    setSelectedGoal: (goal: GoalListApiInterface | null) => void;
    selectedGoal: GoalListApiInterface | null;
}

export type GoalPageProviderProps = {
    children: ReactNode;
}