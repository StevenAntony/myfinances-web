import formatCurrency from '@/src/utils/formats/formatCurrency';
import formatDateTime from '@/src/utils/formats/formatDateTime';

function ColumnAmount ({ amount }: { amount: number }) {
    return (
        <span className={`text-slate-800 font-semibold`}>{formatCurrency(amount)}</span>
    )
}

function ColumnDateTime ({ date }: { date: string }) {
    return (
        <span className={`text-slate-800 capitalize`}>{formatDateTime(date)}</span>
    )
}

const ColumnsTransaction = {
    ColumnAmount: ColumnAmount,
    ColumnDateTime: ColumnDateTime
};

export default ColumnsTransaction;