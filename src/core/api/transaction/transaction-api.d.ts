import { AccountType } from "@/src/utils/consts/AccountType";
import { PaymentMethodEnum } from "@/src/utils/consts/PaymentMethod";
import { ProcessType } from "@/src/utils/consts/ProcessType";

export interface TransactionCreateApiInterface {
    type: ProcessType;
    payment_method: PaymentMethodEnum;
    date: string;
    amount: number;
    description: string;
    category_id: number;
    account_id: number;
    note?: string;
}

export interface TransactionListApiInterface { 
    id: number;
    type: ProcessType;
    paymentMethod: PaymentMethodEnum;
    date: string;
    amount: number;
    description: string;
    note?: string;
    category: {
        name: string;
    };
    account: {
        name: string;
        type: AccountType;
    };
}