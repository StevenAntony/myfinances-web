'use client'
import PulseLoading from "@/src/components/loading/PulseLoading";
import type { TableProps } from 'antd';
import { Table } from "antd";
import useListTransaction from "./hooks/useListTransaction";
import ColumnsTransaction from "./components/ColumnsTransaction";
import { TableTransactionInterface } from "./transaction";
import CardTransaction from "./components/CardTransaction";
import { transactionsDraft } from "./draft/transactionsDraft";

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