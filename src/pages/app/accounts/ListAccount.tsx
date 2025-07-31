import { WalletOutlined } from "@ant-design/icons"
import CardAccount from "./components/card-account"
import { Card } from "antd"

type Props = {}

const accounts = [
    {
        id: 1,
        name: "Cuenta de Ahorros Principal",
        type: "savings",
        balance: 25450.0,
        bank: "Banco Nacional",
        accountNumber: "****1234",
        color: "emerald",
    },
    {
        id: 2,
        name: "Cuenta Corriente",
        type: "checking",
        balance: 15781.89,
        bank: "Banco Nacional",
        accountNumber: "****5678",
        color: "blue",
    },
    {
        id: 3,
        name: "Tarjeta de Crédito Visa",
        type: "credit",
        balance: -2340.5,
        bank: "Banco Crédito",
        accountNumber: "****9012",
        color: "red",
        creditLimit: 5000.0,
    },
    {
        id: 4,
        name: "Efectivo",
        type: "cash",
        balance: 4000.0,
        bank: "N/A",
        accountNumber: "N/A",
        color: "yellow",
    },
    {
        id: 5,
        name: "PayPal",
        type: "digital",
        balance: 1250.75,
        bank: "PayPal Inc.",
        accountNumber: "usuario@email.com",
        color: "purple",
    },
]

export default function ListAccount({ }: Props) {

    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

    return (
        <div className="flex flex-col gap-4">
            {/* Total Balance */}
            <Card className="border-slate-200">
                <div className="py-6">
                    <div className="text-center">
                        <p className="text-sm text-slate-600 mb-2">Balance Total</p>
                        <p className={`text-4xl font-bold ${totalBalance >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                            ${totalBalance.toFixed(2)}
                        </p>
                    </div>
                </div>
            </Card>

            {/* Accounts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accounts.map((account) => <CardAccount account={account} key={account.id} />)}
            </div>

            {/* Account Summary */}
            <Card className="border-slate-200">
                <div className="mb-4">
                    <div className="text-2xl font-semibold text-slate-800">Resumen por Tipo de Cuenta</div>
                    <div className="text-slate-500">Distribución de tu dinero por tipo de cuenta</div>
                </div>
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                            <WalletOutlined className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                            <p className="text-sm text-emerald-700 font-medium">Ahorros</p>
                            <p className="text-xl font-bold text-emerald-800">$25,450.00</p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <WalletOutlined className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <p className="text-sm text-blue-700 font-medium">Corriente</p>
                            <p className="text-xl font-bold text-blue-800">$15,781.89</p>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <WalletOutlined className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                            <p className="text-sm text-yellow-700 font-medium">Efectivo</p>
                            <p className="text-xl font-bold text-yellow-800">$4,000.00</p>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                            <WalletOutlined className="w-8 h-8 text-red-600 mx-auto mb-2" />
                            <p className="text-sm text-red-700 font-medium">Crédito</p>
                            <p className="text-xl font-bold text-red-800">-$2,340.50</p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}