import { AccountType, AccountTypeInfo } from "@/src/utils/consts/AccountType";
import CardAccountInterface from "../../interfaces/card-account";
import { getColorClasses } from "@/src/utils/shared/accountShared";
import { Card } from "antd";
import formatCurrency from "@/src/utils/shared/formats/formatCurrency";

type Props = {
    account: CardAccountInterface
}

export default function CardAccount({ account }: Props) {

    const isNegative = account.balance < 0
    const colors = getColorClasses(account.color, isNegative)

    const accountType = AccountTypeInfo[account.type];

    const Icon = accountType.icon;

    return (
        <Card key={account.id} style={{borderColor: accountType.color}}>
            <div className="pb-3">
                <div className="flex items-center justify-between">
                    <div className={`w-12 h-12  rounded-full flex items-center justify-center text-white`} style={{background: accountType.color}}>
                        <Icon />
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-slate-500">{accountType.label}</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="space-y-3">
                    <div>
                        <h3 className={`font-semibold text-[18px]`} style={{color: accountType.color}}>{account.name}</h3>
                        <p className="text-sm text-slate-600">{account.bank}</p>
                        {account.accountNumber !== "N/A" && (
                            <p className="text-xs text-slate-500">{account.accountNumber}</p>
                        )}
                    </div>

                    <div>
                        <p className="text-xs text-slate-500 mb-1">Balance Actual</p>
                        <p className={`text-2xl font-bold ${isNegative ? "text-red-600" : ''}`} style={{color: accountType.color}}>
                            {formatCurrency(account.balance)}
                            {isNegative && <span className="text-sm ml-1">(Deuda)</span>}
                        </p>
                    </div>

                    {account.type === AccountType.CREDIT && (
                        <div>
                            <p className="text-xs text-slate-500 mb-1">Límite de Crédito</p>
                            <p className="text-sm text-slate-700">{ formatCurrency(account.creditLimit) }</p>
                            <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                                <div
                                    className="bg-red-500 h-2 rounded-full"
                                    style={{ width: `${(Math.abs(account.balance) / account.creditLimit) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">
                                Disponible: { formatCurrency((account.creditLimit - Math.abs(account.balance))) }
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
}