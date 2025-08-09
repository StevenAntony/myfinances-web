'use client'
import { Card } from "antd";
import useMonthlySummary from "../../hooks/useMonthlySummary";
import formatCurrency from "@/src/utils/shared/formats/formatCurrency";
import { useEffect } from "react";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

export default function MonthlySummary() {
    const { data, loading, error, listMonthlySummary } = useMonthlySummary();

    useEffect(() => {
        listMonthlySummary(new Date().getMonth() + 1, new Date().getFullYear());
    }, []);

    const formatPercentageChange = (percentage: number) => {
        const isPositive = percentage >= 0;
        const icon = isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
        // const colorClass = isPositive ? 'text-emerald-600' : 'text-rose-600';
        const sign = isPositive ? '+' : '';
        
        return (
            <span className={`text-xs text-slate-500 flex items-center mt-1`}>
                {icon}
                <span className="ml-1">{sign}{percentage.toFixed(1)}% vs mes anterior</span>
            </span>
        );
    };

    const formatSavingsProgress = (current: number, goal: number) => {
        if (goal === 0) return '0%';
        const percentage = Math.min((current / goal) * 100, 100);
        return `${percentage.toFixed(0)}%`;
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="border-slate-200 animate-pulse">
                        <div className="h-20 bg-slate-200 rounded"></div>
                    </Card>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-slate-200">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="text-sm font-medium text-slate-600">Balance Total</div>
                    {/* <DollarSign className="h-4 w-4 text-slate-400" /> */}
                </div>
                <div>
                    <div className="text-2xl font-bold text-slate-900 font-mono-numbers tracking-tight">
                        {formatCurrency(data?.totalBalance?.amount ?? 0)}
                    </div>
                    {formatPercentageChange(data?.totalBalance?.changePercentage ?? 0)}
                </div>
            </Card>

            <Card className="border-slate-200">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="text-sm font-medium text-slate-600">Ingresos del Mes</div>
                    {/* <TrendingUp className="h-4 w-4 text-emerald-500" /> */}
                </div>
                <div>
                    <div className="text-2xl font-bold text-emerald-600 font-mono-numbers tracking-tight amount-positive">
                        { formatCurrency(data?.totalIncome?.amount ?? 0) }
                    </div>
                    {formatPercentageChange(data?.totalIncome?.changePercentage ?? 0)}
                </div>
            </Card>

            <Card className="border-slate-200">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="text-sm font-medium text-slate-600">Gastos del Mes</div>
                    {/* <TrendingDown className="h-4 w-4 text-red-500" /> */}
                </div>
                <div>
                    <div className="text-2xl font-bold text-rose-600 font-mono-numbers tracking-tight amount-negative">
                        { formatCurrency(data?.totalExpenses?.amount ?? 0) }
                    </div>
                    {formatPercentageChange(data?.totalExpenses?.changePercentage ?? 0)}
                </div>
            </Card>

            <Card className="border-slate-200">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="text-sm font-medium text-slate-600">Ahorro del Mes</div>
                    {/* <Target className="h-4 w-4 text-blue-500" /> */}
                </div>
                <div>
                    <div className="text-2xl font-bold text-blue-600 font-mono-numbers tracking-tight">
                        { formatCurrency(data?.totalSavings?.amount ?? 0) }
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                        Meta: {formatCurrency(data?.totalSavings?.goal ?? 0)} 
                        ({formatSavingsProgress(data?.totalSavings?.amount ?? 0, data?.totalSavings?.goal ?? 0)})
                    </p>
                    </div>
            </Card>
        </div>
    );
}