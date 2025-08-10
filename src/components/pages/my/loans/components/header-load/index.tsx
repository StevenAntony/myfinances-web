'use client'
import TitlePage from "@/src/components/customs/title-page";

export default function HeaderLoad() {
    return (
        <div>
            <TitlePage
                title="Préstamos"
                description="Gestiona préstamos dados y recibidos"
                titleButton="Agregar préstamo"
                handleButton={() => {}}
            />
        </div>
    )
}