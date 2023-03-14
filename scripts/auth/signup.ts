import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();

export async function signUpWithEmailPass(
  email: string,
  password: string,
  birthday: string
) {
  try {
    let baseUrl = "https://cokia.vercel.app";
    let redirectTo = "/profile";
    if (typeof window !== "undefined") {
      baseUrl = location.origin;
    }
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          birthday: birthday,
        },
        emailRedirectTo: `${baseUrl}/callback`,
      },
    });

    if (error) throw error;
    return true;
  } catch (error: any) {
    console.error(error.message);
    alert(error.message);
    throw new Error(error.message);
  }
}
