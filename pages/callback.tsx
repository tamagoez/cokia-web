import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();
import {
  Center,
  Heading,
  Text,
  Spinner,
  useToast,
  CircularProgress,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();
  let redirecturl = "/dashboard";

  async function checkprofile() {
    let profiledata;
  }

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("moveto") != "null"
    ) {
      redirecturl = sessionStorage.getItem("moveto");
    }
    sessionStorage.removeItem("moveto");
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_IN") location.replace("/dashboard");
    });
  }, []);

  return (
    <>
      <Center mt="5">
        <Heading fontSize="2xl" ml="2">
          Signing...
        </Heading>
        <CircularProgress ml="3" isIndeterminate />
      </Center>
      <Center mt="3">
        <Text>You will be redirected</Text>
      </Center>
    </>
  );
}
