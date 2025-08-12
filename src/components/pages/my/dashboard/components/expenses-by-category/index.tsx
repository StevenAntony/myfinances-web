'use client'
import { Card } from "antd";
import { useDashboardPageContext } from "../../contexts/DashboardPageContext";
import formatCurrency from "@/src/utils/shared/formats/formatCurrency";
import { useEffect, useState } from "react";
import { ProcessType } from "@/src/utils/consts/ProcessType";
import { TransactionListApiInterface } from "@/src/core/api/transaction/transaction-api";

export default function ExpensesByCategory() {
    const { transactions } = useDashboardPageContext();

    const [expensesByCategory, setExpensesByCategory] = useState<{ category: string; amount: number, icon: string }[]>([]);

    useEffect(() => {
        const expensesCategories: any = [];
        
        transactions.forEach((transaction) => {
            if (transaction.type === ProcessType.EXPENSE) {
                const findIndex = expensesCategories.findIndex((item: any) => item.category === transaction.category.name);
                if (findIndex === -1) {
                    expensesCategories.push({
                        category: transaction.category.name,
                        amount: transaction.amount,
                        icon: transaction.category.icon
                    });
                } else {
                    expensesCategories[findIndex].amount += transaction.amount;
                }
            }
        });
        
        setExpensesByCategory(expensesCategories);
    }, [transactions])

    return (
        <Card className="border-slate-200 h-full">
            <div className="mb-4">
                <div className="text-slate-800 text-lg font-semibold tracking-tight">Gastos por Categoría</div>
                <div className="text-slate-500">Distribución del gasto mensual</div>
            </div>
            <div>
                <div className="space-y-4">
                    {expensesByCategory.map((category, index) => {
                        return (
                            <div className="flex items-center justify-between" key={index}>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4">{category.icon}</div>
                                    <span className="text-sm text-slate-600">{ category.category }</span>
                                </div>
                                <span className="text-sm font-medium text-slate-600 font-mono-numbers">{ formatCurrency(category.amount) }</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Card>
    );
}