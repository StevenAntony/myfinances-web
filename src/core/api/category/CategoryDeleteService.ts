import { PostgrestError } from "@supabase/supabase-js";
import { SupaBaseService } from "../../supabase/services/SupaBaseService";
import { CategoryListApiInterface } from "./category-api";
import supabase from "../../supabase/app.supabase";

export default class CategoryDeleteService extends SupaBaseService<CategoryListApiInterface, PostgrestError> {

    async __invoke ( id: number ) {
        const { data, error } = await supabase.from('categories')
            .update({ 'active': false })
            .eq('id', id);

        if (error) {
            this.error = error;
            this.success = false;
        }

        this.data = [];
    }

}