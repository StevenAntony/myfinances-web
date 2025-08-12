import { AuthError, User } from "@supabase/supabase-js";
import { SupaBaseService } from "../../supabase/services/SupaBaseService";
import supabase from "../../supabase/app.supabase";
import { ProfileCreateOrUpdateApiInterface } from "./profile-api";

export default class ProfileCreateOrUpdateService extends SupaBaseService<any, AuthError> {
    async __invoke(body: ProfileCreateOrUpdateApiInterface) {
        const { data, error } = await supabase.auth.updateUser({
            data: body
        });

        if (error) {
            this.error = error;
            this.success = false;
        }
        this.data = [data];
    }
}
