import { AccountType } from "@/src/utils/consts/AccountType";

export default interface CardAccountInterface {
    id: number;
    name: string;
    type: AccountType;
    balance: number;
    bank: string;
    accountNumber: string;
    color: string;
    creditLimit: number;
}