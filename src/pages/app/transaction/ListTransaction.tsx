'use client'
import PulseLoading from "@/src/components/loading/PulseLoading";
import useListTransaction from "./hooks/useListTransaction";
import CardTransaction from "./components/CardTransaction";
import { transactionsDraft } from "./draft/transactionsDraft";


export default function ListTransaction() {

    const { loading } = useListTransaction();

    return (
        <div className="h-full py-4">
            <PulseLoading isLoading={loading}>
                <div className="space-y-4">
                    {
                        transactionsDraft.map(transaction => <CardTransaction transaction={transaction} key={transaction.id} />)
                    }
                </div>
                {/* <Table columns={columns} dataSource={transactions} rowKey={(row) => row.id} /> */}
            </PulseLoading>
        </div>
    )
}