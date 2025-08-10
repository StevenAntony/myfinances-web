import { PostgrestError } from "@supabase/supabase-js";
import { SupaBaseService } from "../../supabase/services/SupaBaseService";
import supabase from "../../supabase/app.supabase";
import { GoalListApiInterface } from "./goal-api";

export default class GoalListService extends SupaBaseService<GoalListApiInterface, PostgrestError> {
    async __invoke() {
        const { data, error } = await supabase.from('goals')
        .select(`
            id,
            name,
            description,
            icon,
            goalAmount:goal_amount,
            initialAmount:initial_amount,
            date,
            contributions:goal_contributions(amount)
            `)
        .eq('active', true)
        .eq('goal_contributions.active', true)
        .order('id', { ascending: false });

        if (error) {
            this.error = error;
            this.success = false;
        }

        this.data = data as Array<GoalListApiInterface>;
    }
}