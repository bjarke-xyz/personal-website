import Head from "next/head";
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
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
