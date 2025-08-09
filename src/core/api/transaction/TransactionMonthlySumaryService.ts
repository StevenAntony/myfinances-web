import { PostgrestError } from "@supabase/supabase-js";
import { SupaBaseService } from "../../supabase/services/SupaBaseService";
import supabase from "../../supabase/app.supabase";
import { TransactionMonthlySumaryApiInterface } from "./transaction-api";

class TransactionMonthlySumaryService extends SupaBaseService<TransactionMonthlySumaryApiInterface, PostgrestError>  {
    
    async __invoke(month: number, year: number) {
        const { data, error }: any = await supabase.from('transactions')
            .select(`
                id, 
                type,
                amount,
                date
            `)
            .eq('active', true)
            .gte('date', `${year}-${month.toString().padStart(2, '0')}-01`)
            .lt('date', `${year}-${month.toString().padStart(2, '0')}-${new Date(year, month, 0).getDate().toString().padStart(2, '0')}`);

        if (error) {
            this.error = error;
            this.success = false;
        }

        this.data = data as TransactionMonthlySumaryApiInterface[];
    }
}

export default TransactionMonthlySumaryService;