import { Html, Head, Main, NextScript } from "next/document";

// https://giters.com/vercel/next.js/issues/32110#issuecomment-985977369
// TODO: Fix this weird import
import Document from "next/dist/pages/_document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
