import { PostgrestError } from "@supabase/supabase-js";
import supabase from "../../app.supabase";
import { TransactionInterface } from "./transactions";
import { SupaBaseService } from "../SupaBaseService";

export class TransactionListService extends SupaBaseService<TransactionInterface, PostgrestError> {

    async __invoke() {
        const {
            data: { user },
            error: userError
        } = await supabase.auth.getUser()
        
        const { data, error } = await supabase
            .from('transactions')
            .select('*')
            .eq('user_id', user?.id);
        // type, payment_type
        this.data = data as Array<TransactionInterface>;
        this.error = error;
    }
}