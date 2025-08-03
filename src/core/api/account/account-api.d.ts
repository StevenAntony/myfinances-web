import { AccountType } from "@/src/utils/consts/AccountType"

export interface AccountCreateApiInterface {
    name: string;
    type: AccountType,
    balance: number;
    bank: string;
    accountNumber?: string;
    creditLimit?: number;
}

export interface AccountListApiInterface {
    id: number
    name: string;
    type: AccountType,
    balance?: number;
    bank?: string;
    accountNumber?: string;
    creditLimit?: number;
}