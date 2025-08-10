import { Card } from "antd";

export default function SummaryLoad() {

    const loans = [
        {
            id: 1,
            type: "given", // préstamo que diste
            borrowerName: "María González",
            amount: 5000.0,
            paidAmount: 2000.0,
            interestRate: 5.0,
            startDate: "2024-01-15",
            dueDate: "2024-07-15",
            account: "Cuenta de Ahorros",
            accountType: "savings",
            status: "active",
            description: "Préstamo para negocio familiar",
            paymentSchedule: "monthly",
            nextPaymentDate: "2024-03-15",
            nextPaymentAmount: 500.0,
        },
        {
            id: 2,
            type: "received", // préstamo que recibiste
            lenderName: "Banco Nacional",
            amount: 15000.0,
            paidAmount: 8500.0,
            interestRate: 12.5,
            startDate: "2023-06-01",
            dueDate: "2025-06-01",
            account: "Cuenta Corriente",
            accountType: "checking",
            status: "active",
            description: "Préstamo personal para mejoras del hogar",
            paymentSchedule: "monthly",
            nextPaymentDate: "2024-02-01",
            nextPaymentAmount: 750.0,
        },
        {
            id: 3,
            type: "given",
            borrowerName: "Carlos Ruiz",
            amount: 2000.0,
            paidAmount: 2000.0,
            interestRate: 0.0,
            startDate: "2023-12-01",
            dueDate: "2024-01-01",
            account: "Efectivo",
            accountType: "cash",
            status: "completed",
            description: "Préstamo sin interés para emergencia",
            paymentSchedule: "lump_sum",
            nextPaymentDate: null,
            nextPaymentAmount: 0,
        },
        {
            id: 4,
            type: "received",
            lenderName: "Ana Martínez",
            amount: 3000.0,
            paidAmount: 1000.0,
            interestRate: 3.0,
            startDate: "2024-01-01",
            dueDate: "2024-12-01",
            account: "Cuenta Corriente",
            accountType: "checking",
            status: "active",
            description: "Préstamo familiar para estudios",
            paymentSchedule: "monthly",
            nextPaymentDate: "2024-03-01",
            nextPaymentAmount: 200.0,
        },
    ]

    const givenLoans = loans.filter((loan) => loan.type === "given")
    const receivedLoans = loans.filter((loan) => loan.type === "received")

    const totalGiven = givenLoans.reduce((sum, loan) => sum + loan.amount, 0)
    const totalReceived = receivedLoans.reduce((sum, loan) => sum + loan.amount, 0)
    const totalGivenPending = givenLoans.reduce((sum, loan) => sum + (loan.amount - loan.paidAmount), 0)
    const totalReceivedPending = receivedLoans.reduce((sum, loan) => sum + (loan.amount - loan.paidAmount), 0)

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-slate-200">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="text-sm font-medium text-slate-600">Préstamos Dados</div>
                    {/* <TrendingUp className="h-4 w-4 text-blue-500" /> */}
                </div>
                <div>
                    <div className="text-2xl font-bold text-blue-600">${totalGiven.toFixed(2)}</div>
                    <p className="text-xs text-slate-500 mt-1">Total prestado</p>
                </div>
            </Card>

            <Card className="border-slate-200">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="text-sm font-medium text-slate-600">Por Cobrar</div>
                    {/* <DollarSign className="h-4 w-4 text-emerald-500" /> */}
                </div>
                <div>
                    <div className="text-2xl font-bold text-emerald-600">${totalGivenPending.toFixed(2)}</div>
                    <p className="text-xs text-slate-500 mt-1">Pendiente de cobro</p>
                </div>
            </Card>

            <Card className="border-slate-200">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="text-sm font-medium text-slate-600">Préstamos Recibidos</div>
                    {/* <TrendingDown className="h-4 w-4 text-purple-500" /> */}
                </div>
                <div>
                    <div className="text-2xl font-bold text-purple-600">${totalReceived.toFixed(2)}</div>
                    <p className="text-xs text-slate-500 mt-1">Total recibido</p>
                </div>
            </Card>

            <Card className="border-slate-200">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="text-sm font-medium text-slate-600">Por Pagar</div>
                    {/* <AlertCircle className="h-4 w-4 text-red-500" /> */}
                </div>
                <div>
                    <div className="text-2xl font-bold text-red-600">${totalReceivedPending.toFixed(2)}</div>
                    <p className="text-xs text-slate-500 mt-1">Pendiente de pago</p>
                </div>
            </Card>
        </div>
    )
}