import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();
export async function savePublicProfile(savedata) {
    try {
        const {
    data: { session },
  } = await supabase.auth.getSession();
const { data, error } = await supabase
  .from('public_profile')
  .update(savedata)
  .eq('useruuid', session.user.id)
  .select()
if (error) throw error;
    } catch (error) {
        console.error(error)
    }
}