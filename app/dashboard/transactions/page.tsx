import ListTransaction from "@/src/components/pages/my/transaction/ListTransaction";
import { Suspense } from "react";
import Loading from "./loading";
import FilterTransaction from "@/src/components/pages/my/transaction/FilterTransaction";
import { TransactionPageProvider } from "@/src/components/pages/my/transaction/contexts/TransactionPageContext";

export default function TransactionsPage() {

    return (
       <TransactionPageProvider>
            <div className="space-y-4">
                <div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Transacciones</h1>
                        <p className="text-slate-600">Gestiona todos tus ingresos y gastos</p>
                    </div>
                </div>
                <FilterTransaction />
                <div className="card-custom">
                    <p className="text-2xl font-semibold mb-3">Historial Transacción</p>
                    <Suspense fallback={<Loading />}>
                        <ListTransaction />
                    </Suspense>
                </div>
            </div>
       </TransactionPageProvider>
    )
}