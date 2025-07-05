import {auth} from "@clerk/nextjs/server";
import {createClient} from "@supabase/supabase-js";

export const createSupabaseClient = () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            async accessToken() {
                return ((await auth()).getToken());
            }
        }
    )
}