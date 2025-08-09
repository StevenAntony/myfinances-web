import { useState } from "react";
import TransactionMonthlySumaryService from "@/src/core/api/transaction/TransactionMonthlySumaryService";
import { MonthlySummaryInterface } from "../interfaces/dashboard";
import AccountListService from "@/src/core/api/account/AccountListService";
import { AccountListApiInterface } from "@/src/core/api/account/account-api";
import { TransactionMonthlySumaryApiInterface } from "@/src/core/api/transaction/transaction-api";

export default function useMonthlySummary() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<MonthlySummaryInterface>({} as MonthlySummaryInterface);

    const calculatePercentageChange = (current: number, previous: number): number => {
        if (previous === 0) return current > 0 ? 100 : 0;
        return ((current - previous) / Math.abs(previous)) * 100;
    };

    const listMonthlySummary = async (month: number, year: number) => {
        setLoading(true);
        setError(null);
        
        try {
            // Calcular mes y año anterior
            let previousMonth = month - 1;
            let previousYear = year;
            
            if (previousMonth === 0) {
                previousMonth = 12;
                previousYear = year - 1;
            }

            // Obtener datos del mes actual
            const service = new TransactionMonthlySumaryService();
            await service.__invoke(month, year);

            // Obtener datos del mes anterior
            const servicePreviousMonth = new TransactionMonthlySumaryService();
            await servicePreviousMonth.__invoke(previousMonth, previousYear);

            // Obtener datos de cuentas (balance actual)
            const serviceAccount = new AccountListService();
            await serviceAccount.__invoke();

            const dataAccount: AccountListApiInterface[] = serviceAccount.data as AccountListApiInterface[];
            const dataTransaction: TransactionMonthlySumaryApiInterface[] = service.data as TransactionMonthlySumaryApiInterface[];
            const dataPreviousMonth: TransactionMonthlySumaryApiInterface[] = servicePreviousMonth.data as TransactionMonthlySumaryApiInterface[];

            // Calcular totales del mes actual
            const currentBalance = dataAccount.reduce((acc: number, item) => acc + (item.balance ?? 0), 0);
            const currentIncome = dataTransaction
                .filter((item) => item.type === 'income')
                .reduce((acc: number, item: any) => acc + item.amount, 0);
            const currentExpenses = dataTransaction
                .filter((item) => item.type === 'expense')
                .reduce((acc, item) => acc + Math.abs(item.amount), 0);

            // Calcular totales del mes anterior
            const previousIncome = dataPreviousMonth
                .filter((item) => item.type === 'income')
                .reduce((acc: number, item: any) => acc + item.amount, 0);
            const previousExpenses = dataPreviousMonth
                .filter((item) => item.type === 'expense')
                .reduce((acc, item) => acc + Math.abs(item.amount), 0);
            const previousBalance = currentBalance - (currentIncome - currentExpenses) + (previousIncome - previousExpenses);

            // Calcular ahorros (ingresos - gastos)
            const currentSavings = currentIncome - currentExpenses;
            const previousSavings = previousIncome - previousExpenses;

            const monthlysummaryDashboard: MonthlySummaryInterface = {
                totalBalance: {
                    amount: currentBalance,
                    changePercentage: calculatePercentageChange(currentBalance, previousBalance)
                },
                totalIncome: {
                    amount: currentIncome,
                    changePercentage: calculatePercentageChange(currentIncome, previousIncome)
                },
                totalExpenses: {
                    amount: currentExpenses,
                    changePercentage: calculatePercentageChange(currentExpenses, previousExpenses)
                },
                totalSavings: {
                    amount: currentSavings,
                    goal: currentSavings > 0 ? currentSavings * 1.2 : 4000, // Meta: 20% más o S/ 4,000
                    percentage: currentSavings > 0 ? Math.min((currentSavings / (currentSavings * 1.2)) * 100, 100) : 0
                }
            };

            setData(monthlysummaryDashboard);
        } catch (err) {
            setError('Error al cargar los datos del resumen mensual');
            console.error('Error in listMonthlySummary:', err);
        } finally {
            setLoading(false);
        }
    }
    

    return { loading, error, data, listMonthlySummary };
}
