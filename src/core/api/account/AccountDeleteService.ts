import { PostgrestError } from "@supabase/supabase-js";
import supabase from "../../supabase/app.supabase";
import { SupaBaseService } from "../../supabase/services/SupaBaseService";

export default class AccountDeleteService extends SupaBaseService<boolean, PostgrestError> {

    async __invoke(accountId: number) {
        const { error } = await supabase
            .from('accounts')
            .delete()
            .eq('id', accountId);

        if (error) {
            this.error = error;
            this.success = false;
        } else {
            this.data = [true];
            this.success = true;
        }
    }
}
