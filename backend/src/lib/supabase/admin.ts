import { createClient } from "@supabase/supabase-js";

// Cliente para crear o hacer modificaciones en tabla 'auth.users'
export const createAdminClient = async () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SECRET_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
                detectSessionInUrl: false
            }
        }
    );
};
