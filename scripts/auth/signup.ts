import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();

export async function signUpWithEmailPass(
  email: string,
  password: string,
  birthday: string
) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          birthday: birthday,
        },
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
