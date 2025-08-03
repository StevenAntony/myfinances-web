import { AccountTypeInfoInterface } from '@/src/utils/consts/AccountType'
import formatCurrency from '@/src/utils/shared/formats/formatCurrency';
import React from 'react'

type Props = {
    accountType: AccountTypeInfoInterface;
    resumen: number;
}

export default function CardTypeAccount({ accountType, resumen }: Props) {
    const Icon = accountType.icon
    return (
        <div className="text-center p-4 border rounded-lg" style={{borderColor: accountType.color}}>
            <div className='w-8 h-8 mx-auto mb-2' style={{color: accountType.color}}>
                <Icon />
            </div>
            <p className="text-sm font-medium opacity-95" style={{color: accountType.color}}>{ accountType.label }</p>
            <p className="text-xl font-bold" style={{color: accountType.color}}> { formatCurrency(resumen) } </p>
        </div> 
    )
}