import { PostgrestError } from "@supabase/supabase-js";
import { SupaBaseService } from "../../supabase/services/SupaBaseService";
import supabase from "../../supabase/app.supabase";
import { AccountListApiInterface } from "./account-api";

export default class AccountListService extends SupaBaseService<AccountListApiInterface, PostgrestError> {
    
    async __invoke() {
        const { data, error } = await supabase.from('accounts')
            .select('*')
            .eq('active', true);

        if (error) {
            this.error = error;
            this.success = false;
        }
        
        this.data = data as Array<AccountListApiInterface>;
        
    }

}