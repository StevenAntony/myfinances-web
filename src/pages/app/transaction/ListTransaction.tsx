'use client'
import PulseLoading from "@/src/components/loading/PulseLoading";
import type { TableProps } from 'antd';
import useListTransaction from "./hooks/useListTransaction";
import ColumnsTransaction from "./components/ColumnsTransaction";
import { TableTransactionInterface } from "./transaction";
import CardTransaction from "./components/CardTransaction";
import { transactionsDraft } from "./draft/transactionsDraft";

type ColumnsType<T extends object = object> = TableProps<T>['columns'];

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