import TitlePage from "@/src/components/customs/title-page"

type Props = {}

export default function HeaderAccount({ }: Props) {
    return (
        <TitlePage 
            title="Cuentas y Fuentes"
            description="Gestiona todas tus cuentas bancarias y fuentes de dinero"
            titleButton="Agregar Cuenta"
        />
    )
}