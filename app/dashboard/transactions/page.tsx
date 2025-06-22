'use client'
import { TransactionListService } from "@/src/core/supabase/services/transactions/TransactionList.service";
import { useEffect, useState } from "react";

export default async function TransactionsPage () {
    const [transacciones, setTransacciones] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fecth = async () => {
      const service = (new TransactionListService());
      await service.__invoke()
      const lista = service.data
      console.log(lista);
      
    }

    useEffect(() => {
      fecth()  
    }, [])

    return 'Listar transacciones'
}