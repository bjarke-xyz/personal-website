import Head from "next/head";
import Script from "next/script";
import type { AppProps } from "next/app";
import { ThemeProvider } from "../hooks/theme-context";
import "../styles/style.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Head>
        <meta
          name="keywords"
          content="Portfolio, Software, IT, Ingeniør, Engineer, Website, Programming, Computer, Science"
        />
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "580bfe37627a49448e86f2401b50191f"}'
        ></Script>
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
