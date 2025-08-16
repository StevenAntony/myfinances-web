import supabase from "../../supabase/app.supabase";

export class TransactionDeleteService {
    static async deleteTransaction(transactionId: number | string): Promise<void> {
        const { error } = await supabase
            .from('transactions')
            .delete()
            .eq('id', transactionId);

        if (error) {
            throw new Error(`Error deleting transaction: ${error.message}`);
        }
    }
}
