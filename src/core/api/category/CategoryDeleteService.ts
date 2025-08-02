import { PostgrestError } from "@supabase/supabase-js";
import { SupaBaseService } from "../../supabase/services/SupaBaseService";
import supabase from "../../supabase/app.supabase";

export default class CategoryDeleteService extends SupaBaseService<string, PostgrestError> {

    async __invoke ( id: number ) {
        const { data, error } = await supabase.from('categories')
            .update({ 'active': false })
            .eq('id', id);

        if (error) {
            this.error = error;
            this.success = false;
        }

        this.data = [data ?? ''];
    }

}