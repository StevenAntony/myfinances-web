import { PostgrestError } from "@supabase/supabase-js";
import { SupaBaseService } from "../../supabase/services/SupaBaseService";
import supabase from "../../supabase/app.supabase";
import { ContributionsCreateApiInterface } from "./goal-api";

export default class ContributionsCreateService extends SupaBaseService<any, PostgrestError> {
    async __invoke(body: ContributionsCreateApiInterface) {
        const { data, error } = await supabase.from('goal_contributions').insert([
            { ...body }
        ]);

        if (error) {
            this.error = error;
            this.success = false;
        }

        this.data = [data];
        
    }
}