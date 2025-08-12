import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? '', process.env.NEXT_PUBLIC_SUPABASE_API_KEY ?? '', {
    auth: {
        storageKey: 'myapp-auth',
        persistSession: true,
    }
});

export default supabase;