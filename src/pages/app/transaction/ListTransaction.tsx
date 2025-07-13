'use client'
import PulseLoading from "@/src/components/loading/PulseLoading";
import type { TableProps } from 'antd';
import { Table } from "antd";
import useListTransaction from "./hooks/useListTransaction";
import ColumnsTransaction from "./components/ColumnsTransaction";
import { TableTransactionInterface } from "./transaction";

type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type Props = {}

export default function ListTransaction({ }: Props) {

    const { loading, transactions } = useListTransaction();
    
        const columns: ColumnsType<TableTransactionInterface> = [
        {
            title: 'Tipo',
            dataIndex: 'type',
            width: '20%',
        },
        {
            title: 'Fecha',
            dataIndex: 'date',
            width: '20%',
            render: (value: number, record: TableTransactionInterface) => <ColumnsTransaction.ColumnDateTime date={record.date} />
        },
        {
            title: 'Categoria',
            dataIndex: 'category',
            width: '20%',
        },
        {
            title: 'Tipo Pago',
            dataIndex: 'payment_type',
            width: '10%',
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            width: '20%',
        },
        {
            title: 'Monto',
            dataIndex: 'amount',
            width: '20%',
            render: (value: number, record: TableTransactionInterface) => <ColumnsTransaction.ColumnAmount amount={record.amount} />
        },
    ];


    return (
        <div className="h-full">
            <PulseLoading isLoading={loading}>
                <Table columns={columns} dataSource={transactions} rowKey={(row) => row.id} />
            </PulseLoading>
        </div>
    )
}