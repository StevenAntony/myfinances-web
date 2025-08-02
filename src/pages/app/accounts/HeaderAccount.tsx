'use client'
import TitlePage from "@/src/components/customs/title-page"

export default function HeaderAccount() {
    return (
        <div>
            <TitlePage 
                title="Cuentas y Fuentes"
                description="Gestiona todas tus cuentas bancarias y fuentes de dinero"
                titleButton="Agregar Cuenta"
                handleButton={() => {}}
            />
        </div>
    )
}