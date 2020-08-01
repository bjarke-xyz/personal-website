import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider } from "../hooks/theme-context";
import "../styles/globals.scss";
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Head>
        <meta
          name="description"
          content="My name is Bjarke Tobiesen. I am currently studying Software Technology at University of Southern Denmark."
        />
        <meta
          name="keywords"
          content="Portfolio, Bjarke, Tobiesen, Software, IT, Ingeniør, Engineer, Website, Programming, Computer, Science, SDU"
        />
        <meta name="author" content="Bjarke Tobiesen" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
