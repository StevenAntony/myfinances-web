import { PostgrestError } from "@supabase/supabase-js";
import supabase from "../../supabase/app.supabase";
import { SupaBaseService } from "../../supabase/services/SupaBaseService";
import { TransactionListApiInterface } from "./transaction-api";

export class TransactionListService extends SupaBaseService<TransactionListApiInterface, PostgrestError> {

    async __invoke() {
        const { data, error }: any = await supabase.from('transactions')
            .select(`
                id, 
                type,
                amount,
                description,
                note,
                paymentMethod:payment_method,
                date,
                category:categories ( id, name, icon ),
                account:accounts ( id, name, type )
            `)
            .eq('active', true)
            .order('id', { ascending: false });

        if (error) {
            this.error = error;
            this.success = false;
        }
        
        this.data = data as TransactionListApiInterface[];
    }
}