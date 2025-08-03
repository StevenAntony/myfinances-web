import { PostgrestError } from "@supabase/supabase-js";
import { SupaBaseService } from "../../supabase/services/SupaBaseService";
import supabase from "../../supabase/app.supabase";
import { AccountCreateApiInterface } from "./account-api";

export default class AccountCreateOrUpdateService extends SupaBaseService<string, PostgrestError> {
    async __invoke(body: AccountCreateApiInterface) {
        const { data, error } = await supabase.from('categories').insert([
            { ...body }
        ]);

        if (error) {
            this.error = error;
            this.success = false;
        }

        this.data = [data ?? ''];
        
    }
}