import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();

export async function getMyHandleid() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session?.user.user_metadata.handleid;
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function verifyHandleid(originalhandleid: string) {
  try {
    const handleid = originalhandleid.toLowerCase();
    if (handleid.length <= 5) return false;
    //if (
    //  !/^(?!\s)(?!\p{C})(?!(\s|\p{C}|\p{Zs})*$)(?!.*[\p{Zs}\p{C}]).+(?<!\s)(?<!\p{C})(?<!\p{Zs})$/u.test(
    //    handleid
    //  )
    //)
    if (!/^[a-zA-Z0-9_]*$/.test(originalhandleid)) return false;
    const { count, error } = await supabase
      .from("public_profile")
      .select("*", { count: "exact" })
      .eq("handleid", handleid);
    if (error) throw error;
    if (count == 0) return true;
    return false;
  } catch (error) {
    console.error(error.message);
    return false;
  }
}
