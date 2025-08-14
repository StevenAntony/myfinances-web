import { PostgrestError } from "@supabase/supabase-js";
import supabase from "../../supabase/app.supabase";
import { SupaBaseService } from "../../supabase/services/SupaBaseService";

export default class AccountHasTransactionsService extends SupaBaseService<boolean, PostgrestError> {

    async __invoke(accountId: number) {
        const { data, error } = await supabase
            .from('transactions')
            .select('id')
            .eq('account_id', accountId)
            .eq('active', true)
            .limit(1);

        if (error) {
            this.error = error;
            this.success = false;
        } else {
            this.data = [data && data.length > 0];
            this.success = true;
        }
    }
}
