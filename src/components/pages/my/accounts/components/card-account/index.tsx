import { AccountType } from "@/src/utils/consts/AccountType";
import { accountTypeIconData, accountTypeLabelsData } from "@/src/utils/data/accountData";
import CardAccountInterface from "../../interfaces/card-account";
import { getColorClasses } from "@/src/utils/shared/accountShared";
import { WalletOutlined } from "@ant-design/icons"
import { Card } from "antd";

type Props = {
    account: CardAccountInterface
}

export default function CardAccount({ account }: Props) {

    const isNegative = account.balance < 0
    const colors = getColorClasses(account.color, isNegative)

    const getAccountIcon = (type: AccountType) => {
        return accountTypeIconData[type] ?? <WalletOutlined />;
    }

    const getAccountTypeLabel = (type: AccountType) => {
        return accountTypeLabelsData[type] ?? 'Cuenta';
    }

    return (
        <Card key={account.id} className={`${colors.border} ${colors.bg}`}>
            <div className="pb-3">
                <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 ${colors.icon} rounded-full flex items-center justify-center text-white`}>
                        {getAccountIcon(account.type as AccountType)}
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-slate-500">{getAccountTypeLabel(account.type as AccountType)}</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="space-y-3">
                    <div>
                        <h3 className={`font-semibold ${colors.text}`}>{account.name}</h3>
                        <p className="text-sm text-slate-600">{account.bank}</p>
                        {account.accountNumber !== "N/A" && (
                            <p className="text-xs text-slate-500">{account.accountNumber}</p>
                        )}
                    </div>

                    <div>
                        <p className="text-xs text-slate-500 mb-1">Balance Actual</p>
                        <p className={`text-2xl font-bold ${isNegative ? "text-red-600" : colors.text}`}>
                            ${Math.abs(account.balance).toFixed(2)}
                            {isNegative && <span className="text-sm ml-1">(Deuda)</span>}
                        </p>
                    </div>

                    {account.creditLimit && (
                        <div>
                            <p className="text-xs text-slate-500 mb-1">Límite de Crédito</p>
                            <p className="text-sm text-slate-700">${account.creditLimit.toFixed(2)}</p>
                            <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                                <div
                                    className="bg-red-500 h-2 rounded-full"
                                    style={{ width: `${(Math.abs(account.balance) / account.creditLimit) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                                Disponible: ${(account.creditLimit - Math.abs(account.balance)).toFixed(2)}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
}