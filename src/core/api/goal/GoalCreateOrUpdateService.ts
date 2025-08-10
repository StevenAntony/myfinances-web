import { PostgrestError } from "@supabase/supabase-js";
import { SupaBaseService } from "../../supabase/services/SupaBaseService";
import supabase from "../../supabase/app.supabase";
import { GoalCreateApiInterface } from "./goal-api";

export default class GoalCreateOrUpdateService extends SupaBaseService<string, PostgrestError> {
    async __invoke(body: GoalCreateApiInterface) {
        const { data, error } = await supabase.from('goals').insert([
            { ...body }
        ]);

        if (error) {
            this.error = error;
            this.success = false;
        }

        this.data = [data ?? ''];
        
    }
}