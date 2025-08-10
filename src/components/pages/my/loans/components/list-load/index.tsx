'use client'
import { Avatar, Button, Card, Progress, Tabs, Tag } from "antd";
import { useState } from "react";

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

export default function ListLoad() {
    const [activeKey, setActiveKey] = useState('1');

    const getAccountIcon = (accountType: string) => {
        switch (accountType) {
            case "savings":
                return "🏦"
            case "checking":
                return "🏦"
            case "credit":
                return "💳"
            case "cash":
                return "💵"
            default:
                return "💰"
        }
    }

    const getStatusBadge = (loan: any) => {
        if (loan.status === "completed") {
            return (
                <Tag color="success">
                    {/* <CheckCircle className="w-3 h-3 mr-1" /> */}
                    Completado
                </Tag>
            )
        }

        const daysUntilDue = Math.ceil((new Date(loan.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

        if (daysUntilDue < 0) {
            return (
                <Tag color="error">
                    {/* <AlertCircle className="w-3 h-3 mr-1" /> */}
                    Vencido
                </Tag>
            )
        } else if (daysUntilDue < 30) {
            return (
                <Tag color="warning">
                    {/* <Clock className="w-3 h-3 mr-1" /> */}
                    Próximo a vencer
                </Tag>
            )
        } else {
            return (
                <Tag color="blue">
                    {/* <Clock className="w-3 h-3 mr-1" /> */}
                    Activo
                </Tag>
            )
        }
    }

    const calculateMonthlyPayment = (principal: number, rate: number, months: number) => {
        if (rate === 0) return principal / months
        const monthlyRate = rate / 100 / 12
        return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    }


    return (
        <div>
            <Tabs
                defaultActiveKey="1"
                type="card"
                size={'small'}
                style={{ marginBottom: 32 }}
                items={[
                    {
                        label: `Préstamos Dados (${givenLoans.length})`,
                        key: "1",
                        children: <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {givenLoans.map((loan) => {
                                const percentage = (loan.paidAmount / loan.amount) * 100
                                const remaining = loan.amount - loan.paidAmount

                                return (
                                    <Card key={loan.id} className="border-slate-200">
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <Avatar className="w-6 h-6 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <div className="text-lg text-slate-900">{loan.borrowerName}</div>
                                                        <div className="flex items-center gap-1">
                                                            <span>{getAccountIcon(loan.accountType)}</span>
                                                            {loan.account}
                                                        </div>
                                                    </div>
                                                </div>
                                                {getStatusBadge(loan)}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-sm text-slate-500">Monto Prestado</p>
                                                        <p className="text-xl font-bold text-slate-900">${loan.amount.toFixed(2)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-slate-500">Por Cobrar</p>
                                                        <p className="text-xl font-bold text-emerald-600">${remaining.toFixed(2)}</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="flex justify-between text-xs text-slate-500 mb-2">
                                                        <span>Progreso de Pago</span>
                                                        <span>{percentage.toFixed(1)}%</span>
                                                    </div>
                                                    <Progress percent={percentage} showInfo={false} className="h-2" />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <p className="text-slate-500">Tasa de Interés</p>
                                                        <p className="font-medium">{loan.interestRate}%</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-500">Vencimiento</p>
                                                        <p className="font-medium">{new Date(loan.dueDate).toLocaleDateString()}</p>
                                                    </div>
                                                </div>

                                                {loan.nextPaymentDate && (
                                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                                        <p className="text-sm text-blue-700 font-medium">Próximo Pago Esperado</p>
                                                        <p className="text-blue-800">
                                                            ${loan.nextPaymentAmount.toFixed(2)} - {new Date(loan.nextPaymentDate).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                )}

                                                <div className="flex gap-2">
                                                    <Button size="small" onClick={() => {
                                                        //  setSelectedLoan(loan)
                                                    }}>
                                                        {/* <Eye className="w-3 h-3 mr-1" /> */}
                                                        Ver Detalles
                                                    </Button>
                                                    {loan.status === "active" && (
                                                        <Button
                                                            size="small"
                                                            className="bg-emerald-600 hover:bg-emerald-700"
                                                            onClick={() => {
                                                                // setSelectedLoan(loan)
                                                                // setIsPaymentDialogOpen(true)
                                                            }}
                                                        >
                                                            {/* <DollarSign className="w-3 h-3 mr-1" /> */}
                                                            Registrar Pago
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })}
                        </div>,
                    },
                    {
                        label: `Préstamos Recibidos (${receivedLoans.length})`,
                        key: "2",
                        children: (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {receivedLoans.map((loan) => {
                                    const percentage = (loan.paidAmount / loan.amount) * 100
                                    const remaining = loan.amount - loan.paidAmount

                                    return (
                                        <Card key={loan.id} className="border-slate-200">
                                            <div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                                            {/* <HandCoins className="w-6 h-6 text-purple-600" /> */}
                                                        </div>
                                                        <div>
                                                            <div className="text-lg text-slate-900">{loan.lenderName}</div>
                                                            <div className="flex items-center gap-1">
                                                                <span>{getAccountIcon(loan.accountType)}</span>
                                                                {loan.account}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {getStatusBadge(loan)}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="space-y-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <p className="text-sm text-slate-500">Monto Recibido</p>
                                                            <p className="text-xl font-bold text-slate-900">${loan.amount.toFixed(2)}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-slate-500">Por Pagar</p>
                                                            <p className="text-xl font-bold text-red-600">${remaining.toFixed(2)}</p>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div className="flex justify-between text-xs text-slate-500 mb-2">
                                                            <span>Progreso de Pago</span>
                                                            <span>{percentage.toFixed(1)}%</span>
                                                        </div>
                                                        <Progress percent={percentage} showInfo={false} className="h-2" />
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                                        <div>
                                                            <p className="text-slate-500">Tasa de Interés</p>
                                                            <p className="font-medium">{loan.interestRate}%</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-slate-500">Vencimiento</p>
                                                            <p className="font-medium">{new Date(loan.dueDate).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>

                                                    {loan.nextPaymentDate && (
                                                        <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                                                            <p className="text-sm text-red-700 font-medium">Próximo Pago</p>
                                                            <p className="text-red-800">
                                                                ${loan.nextPaymentAmount.toFixed(2)} - {new Date(loan.nextPaymentDate).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    )}

                                                    <div className="flex gap-2">
                                                        <Button variant="outlined" size="small" onClick={() => {
                                                            // setSelectedLoan(loan)
                                                        }}>
                                                            {/* <Eye className="w-3 h-3 mr-1" /> */}
                                                            Ver Detalles
                                                        </Button>
                                                        {loan.status === "active" && (
                                                            <Button
                                                                size="small"
                                                                className="bg-red-600 hover:bg-red-700"
                                                                onClick={() => {
                                                                    // setSelectedLoan(loan)
                                                                    // setIsPaymentDialogOpen(true)
                                                                }}
                                                            >
                                                                {/* <DollarSign className="w-3 h-3 mr-1" /> */}
                                                                Registrar Pago
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    )
                                })}
                            </div>
                        ),
                    }
                ]}
            />
        </div>
    )
}