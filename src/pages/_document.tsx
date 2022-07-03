import { Html, Head, Main, NextScript } from "next/document";

// https://giters.com/vercel/next.js/issues/32110#issuecomment-985977369
// TODO: Fix this weird import
import Document from "next/dist/pages/_document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body className="font-mono bg-background dark:bg-background-dark text-lg h-full min-h-screen text-body dark:text-body-dark">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
