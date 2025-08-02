export default interface CardAccountInterface {
    id: number;
    name: string;
    type: string;
    balance: number;
    bank: string;
    accountNumber: string;
    color: string;
    creditLimit?: number;
}