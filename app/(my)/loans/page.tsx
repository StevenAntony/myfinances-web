import HeaderLoad from "@/src/components/pages/my/loans/components/header-load";
import ListLoad from "@/src/components/pages/my/loans/components/list-load";
import SummaryLoad from "@/src/components/pages/my/loans/components/summary-load";

export default function LoansPage() {
    return (
        <div className="space-y-4">
            <HeaderLoad />
            <SummaryLoad />
            <ListLoad />
        </div>
    )
}