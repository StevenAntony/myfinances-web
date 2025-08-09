import { Card } from "antd";

export default function FinancialSummary() {
    return (
        <Card className="lg:col-span-2 border-slate-200">
            <div>
                <div className="text-slate-800 text-lg font-semibold tracking-tight">Resumen Financiero</div>
                <div className="text-slate-500">
                    Evolución de tus ingresos y gastos en los últimos 6 meses
                </div>
            </div>
            <div>
                <div className="h-80 bg-slate-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-slate-400">
                        {/* <BarChart3 className="w-12 h-12 mx-auto mb-2" /> */}
                        <p>Gráfico de evolución financiera</p>
                    </div>
                </div>
            </div>
        </Card>
    );
}