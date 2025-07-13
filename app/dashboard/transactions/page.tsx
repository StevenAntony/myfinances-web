import ListTransaction from "@/src/pages/app/transaction/ListTransaction";
import { Suspense } from "react";
import Loading from "./loading";
import FilterTransaction from "@/src/pages/app/transaction/FilterTransaction";

export default function TransactionsPage() {

    return (
        <div className="card-custom">
            <p className="text-2xl font-semibold mb-3">Historial Transacción</p>
            <div className="section-filter">
                <FilterTransaction />
            </div>
            <Suspense fallback={<Loading />}>
                Lista
                {/* <ListTransaction /> */}
            </Suspense>
        </div>
    )
}