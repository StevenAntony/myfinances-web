import { AccountType, AccountTypeInfo } from "@/src/utils/consts/AccountType";

type Props = {
    data: { label: string, icon: string, color: string,  };
    id: string;
}

export default function OptionType({ data, id }: Props) {
    const Icon = AccountTypeInfo[id as AccountType].icon;

    const color = data.color ? data.color : AccountTypeInfo[id as AccountType].color;

    return (
        <div className="flex items-center gap-2">
            <div>
                <div className={`w-6 h-6 flex rounded-sm justify-center items-center text-white`} style={{background: color}}>
                    <Icon className="w-4 h-4" />
                </div>
            </div>
            <div>{data.label}</div>
        </div>
    )
}