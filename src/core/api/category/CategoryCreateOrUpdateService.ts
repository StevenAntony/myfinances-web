import { PostgrestError } from "@supabase/supabase-js";
import { SupaBaseService } from "../../supabase/services/SupaBaseService";
import supabase from "../../supabase/app.supabase";
import { CategoryCreateApiInterface } from "./category-api";

export default class CategoryCreateOrUpdateService extends SupaBaseService<string, PostgrestError> {
    async __invoke(category: CategoryCreateApiInterface, categoryId?: number) {
        
        if (categoryId) {
            const { data, error } = await supabase.from('categories').update({
                ...category
            }).eq('id', categoryId);
            
            if (error) {
                this.error = error;
                this.success = false;
            }
        } else {
            const { data, error } = await supabase.from('categories').insert([
                { ...category }
            ]);
            
            if (error) {
                this.error = error;
                this.success = false;
            }
        }

        this.data = [];
        
    }
}