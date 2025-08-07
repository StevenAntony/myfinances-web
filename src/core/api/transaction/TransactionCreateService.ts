import { PostgrestError } from "@supabase/supabase-js";
import { SupaBaseService } from "../../supabase/services/SupaBaseService";
import supabase from "../../supabase/app.supabase";
import { TransactionCreateApiInterface } from "./transaction-api";

export default class TransactionCreateService extends SupaBaseService<any, PostgrestError> {
    
    async __invoke(body: TransactionCreateApiInterface) {
        const { data, error } = await supabase.from('transactions').insert([
            { ...body }
        ]);

        if (error) {
            this.error = error;
            this.success = false;
        }

        this.data = [data ?? ''];
    }

}