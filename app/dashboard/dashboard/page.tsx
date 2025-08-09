import MonthlySummary from "@/src/components/pages/my/dashboard/components/monthly-summary";
import BalancebyAccount from "@/src/components/pages/my/dashboard/components/balance-by-account";
import { DashboardPageProvider } from "@/src/components/pages/my/dashboard/contexts/DashboardPageContext";

export default function DashboardPage() {
    return (
        <DashboardPageProvider  >
            <div className="space-y-4">
                <MonthlySummary />
                <BalancebyAccount />
            </div>
        </DashboardPageProvider>
    );
}
