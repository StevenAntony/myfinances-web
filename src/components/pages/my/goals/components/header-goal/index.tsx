'use client'
import TitlePage from "@/src/components/customs/title-page";

export default function HeaderGoal() {
    return (
        <div>
            <TitlePage 
                title="Metas Financieras" 
                description="Establece y sigue el progreso de tus objetivos de ahorro" 
                titleButton="Agregar meta" 
                handleButton={() => {}} 
            />
        </div>
    )
}