'use client'
import { Card } from "antd";
import { useDashboardPageContext } from "../../contexts/DashboardPageContext";
import CardAccount from "./CardAccount";

export default function BalancebyAccount() {
    const { accounts } = useDashboardPageContext();

    return (
        <Card className="border-slate-200">
            <div className="mb-4">
                <div className="text-slate-800 text-lg font-semibold tracking-tight">Balance por Cuenta</div>
                <div className="text-slate-500">Distribución de tu dinero en diferentes cuentas</div>
            </div>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {accounts.map((account) => (
                        <CardAccount key={account.id} account={account} />
                    ))}
                </div>
            </div>
        </Card>
    );
}
                