'use client'
import PulseLoading from "@/src/components/loading/PulseLoading";
import { Table } from "antd";
import useListTransaction from "./hooks/useListTransaction";

type Props = {}

export default function ListTransaction({ }: Props) {

    const { columns, loading, transactions } = useListTransaction();
    

    return (
        <div className="h-full">
            <PulseLoading isLoading={loading}>
                <Table columns={columns} dataSource={transactions} rowKey={(row) => row.id} />
            </PulseLoading>
        </div>
    )
}