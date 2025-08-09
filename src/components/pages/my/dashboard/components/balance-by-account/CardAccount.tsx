import { AccountTypeInfo } from "@/src/utils/consts/AccountType";
import { AccountType } from "@/src/utils/consts/AccountType";
import CardAccountInterface from "../../../accounts/interfaces/card-account";
import formatCurrency from "@/src/utils/shared/formats/formatCurrency";

export default function CardAccount({ account }: { account: CardAccountInterface}) {

    const accountType = AccountTypeInfo[account.type as AccountType];
    
    const Icon = accountType.icon;
    
    return (
        <div className="p-4 rounded-lg border" style={{borderColor: accountType.color}}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-600">{account.name}</p>
                    <div className="text-2xl font-medium text-slate-900 font-mono-numbers tracking-tight">
                        {formatCurrency(account.balance)}
                    </div>
                </div>
                <div className="w-12 h-12 text-white rounded-full flex items-center justify-center" style={{background: accountType.color}}>
                    <Icon />
                </div>
            </div>
        </div>
    );
}