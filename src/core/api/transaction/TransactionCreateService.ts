import { PostgrestError } from "@supabase/supabase-js";
import { SupaBaseService } from "../../supabase/services/SupaBaseService";
import supabase from "../../supabase/app.supabase";
import { TransactionCreateApiInterface } from "./transaction-api";
import { ProcessType } from "@/src/utils/consts/ProcessType";

export default class TransactionCreateService extends SupaBaseService<any, PostgrestError> {
    
    async __invoke(body: TransactionCreateApiInterface) {
        try {
            // First, get the current account balance
            const { data: accountData, error: accountError } = await supabase
                .from('accounts')
                .select('balance')
                .eq('id', body.account_id)
                .single();

            if (accountError) {
                this.error = accountError;
                this.success = false;
                return;
            }

            // Calculate new balance based on transaction type
            const currentBalance = accountData.balance || 0;
            const transactionAmount = body.amount;
            let newBalance: number;

            // If it's income, add to balance; if expense, subtract from balance
            if (body.type === ProcessType.INCOME) {
                newBalance = currentBalance + transactionAmount;
            } else {
                newBalance = currentBalance - transactionAmount;
            }

            // Create the transaction
            const { data, error } = await supabase.from('transactions').insert([
                { ...body }
            ]);

            if (error) {
                this.error = error;
                this.success = false;
                return;
            }

            // Update the account balance
            const { data: dataUpdated, error: errorUpdated } = await supabase
                .from('accounts')
                .update({ balance: newBalance })
                .eq('id', body.account_id);

            if (errorUpdated) {
                this.error = errorUpdated;
                this.success = false;
                return;
            }

            this.data = [];
            this.success = true;

        } catch (err) {
            this.error = err as PostgrestError;
            this.success = false;
        }
    }
}