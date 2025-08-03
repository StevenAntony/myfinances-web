'use client'
import TitlePage from "@/src/components/customs/title-page"
import FormAccount from "./FormAccount"
import { useAccountPageContext } from "./contexts/AccountPageContext"

export default function HeaderAccount() {
    const { openForm } = useAccountPageContext();

    return (
        <>
            <TitlePage 
                title="Cuentas y Fuentes"
                description="Gestiona todas tus cuentas bancarias y fuentes de dinero"
                titleButton="Agregar Cuenta"
                handleButton={openForm}
            />
            <FormAccount />
        </>
    )
}