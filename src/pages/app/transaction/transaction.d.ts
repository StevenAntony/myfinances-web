export interface TableTransactionInterface {
    id: string;
    date: string;
    description?: string;
    type: string;
    payment_type: string;
    amount: number;
    category: string;
}