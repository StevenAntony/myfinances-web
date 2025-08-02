import { TagOutlined } from "@ant-design/icons"

export default function EmptyCategory() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center justify-center p-8 text-center">
                    <div className="rounded-full bg-slate-200 p-6 mb-4">
                        <TagOutlined className="text-4xl text-muted-foreground" />
                    </div>

                    <h3 className="text-xl font-semibold mb-2">No tienes categorías creadas</h3>

                    <p className="text-gray-700 mb-6 text-sm">
                        Las categorías te ayudan a organizar y clasificar tus ingresos y gastos. Crea tu primera categoría para
                        comenzar a controlar mejor tus finanzas.
                    </p>
                    <div className="mt-6 text-xs text-gray-600">
                        Ejemplos: Alimentación, Transporte, Entretenimiento, Salario
                    </div>
                </div>
            </div>
        </div> 
    )
}