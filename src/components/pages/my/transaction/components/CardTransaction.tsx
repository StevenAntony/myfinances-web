import { Badge } from "antd"
import { CalendarOutlined, FallOutlined, RiseOutlined } from "@ant-design/icons"
import { CardTransactionInterface } from "../interfaces/card-transaction"

type Props = {
    transaction: CardTransactionInterface
}

const getAccountIcon = (accountType: string) => {
    switch (accountType) {
        case "bank":
        case "savings":
            return "🏦"
        case "credit":
            return "💳"
        case "debit":
            return "💳"
        case "cash":
            return "💵"
        default:
            return "💰"
    }
}

export default function CardTransaction({ transaction }: Props) {
    return (
        <div
            key={transaction.id}
            className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
            <div className="flex items-center gap-4">
                <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${transaction.type === "income" ? "bg-emerald-100" : "bg-red-100"
                        }`}
                >
                    {transaction.type === "income" ? (
                        <RiseOutlined className="w-5 h-5 text-emerald-600" />
                    ) : (
                        <FallOutlined className="w-5 h-5 text-red-600" />
                    )}
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-slate-900">{transaction.description}</h3>
                        <Badge status="default" size="small" className="text-xs">
                            {transaction.category}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                            <CalendarOutlined className="w-3 h-3" />
                            {new Date(transaction.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                            <span>{getAccountIcon(transaction.accountType)}</span>
                            {transaction.account}
                        </span>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <div
                    className={`text-lg font-semibold ${transaction.type === "income" ? "text-emerald-600" : "text-red-600"
                        }`}
                >
                    {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </div>
            </div>
        </div>
    )
}