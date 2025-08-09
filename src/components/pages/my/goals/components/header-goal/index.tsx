'use client'
import TitlePage from "@/src/components/customs/title-page";
import { useGoalPageContext } from "../../contexts/GoalPageContext";
import FormGoal from "../form-goal";

export default function HeaderGoal() {
    const { openForm } = useGoalPageContext();

    return (
        <div>
            <TitlePage 
                title="Metas Financieras" 
                description="Establece y sigue el progreso de tus objetivos de ahorro" 
                titleButton="Agregar meta" 
                handleButton={openForm} 
            />
            <FormGoal />
        </div>
    )
}