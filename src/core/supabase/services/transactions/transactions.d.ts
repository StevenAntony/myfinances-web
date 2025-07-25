export interface TransactionInterface { 
    id: string;
    date: string;
    type: string;
    payment_type: string;
    category: string;
    description?: string;
    amount: number;
}