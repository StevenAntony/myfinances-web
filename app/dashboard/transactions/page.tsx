import ListTransaction from "@/src/pages/app/transaction/ListTransaction";
import { Suspense } from "react";
import Loading from "./loading";

export default function TransactionsPage () {
    
    return (
      <div className="bg-white p-[24px] shadow border rounded-sm border-gray-200">
        <p className="text-2xl font-semibold text-slate-800 mb-3">Historial Transacción</p>
        <Suspense fallback={<Loading />}>
          <ListTransaction />
        </Suspense>
      </div>
    )
}