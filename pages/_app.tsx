import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const cookies = parseCookies();
    console.log({ cookies });
    if (!cookies.lang) {
      setCookie(null, "lang", window.navigator.language, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    }
  }, []);
  return (
    <>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>

      <Analytics />
    </>
  );
}

export default MyApp;
