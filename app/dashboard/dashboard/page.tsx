import MonthlySummary from "@/src/components/pages/my/dashboard/components/monthly-summary";
import BalancebyAccount from "@/src/components/pages/my/dashboard/components/balance-by-account";
import { DashboardPageProvider } from "@/src/components/pages/my/dashboard/contexts/DashboardPageContext";
import FinancialSummary from "@/src/components/pages/my/dashboard/components/financial-summary";
import ExpensesByCategory from "@/src/components/pages/my/dashboard/components/expenses-by-category";

export default function DashboardPage() {
    return (
        <DashboardPageProvider  >
            <div className="space-y-4">
                <MonthlySummary />
                <BalancebyAccount />
                <div className="flex gap-4 mt-4">
                    <div className="w-2/3">
                        <FinancialSummary />
                    </div>
                    <div className="w-1/3">
                        <ExpensesByCategory />
                    </div>
                </div>
            </div>
        </DashboardPageProvider>
    );
}
