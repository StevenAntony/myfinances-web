export interface MonthlySummaryInterface {
    totalBalance: {
        amount: number;
        changePercentage: number; 
    };
    totalIncome: {
        amount: number;
        changePercentage: number;
    };
    totalExpenses: {
        amount: number;
        changePercentage: number;
    };
    totalSavings: {
        amount: number;
        goal: number;
        percentage: number;
    };
}
