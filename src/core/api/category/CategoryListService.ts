import { PostgrestError } from "@supabase/supabase-js";
import { SupaBaseService } from "../../supabase/services/SupaBaseService";
import supabase from "../../supabase/app.supabase";
import { CategoryListApiInterface } from "./category-api";

export default class CategoryListService extends SupaBaseService<CategoryListApiInterface, PostgrestError> {
    
    async __invoke() {
        const { data, error } = await supabase.from('categories').select('*');

        if (error) {
            this.error = error;
            this.success = false;
        }
        
        this.data = data as Array<CategoryListApiInterface>;
        
    }

}