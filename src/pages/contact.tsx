import Layout from "../components/layout";
import Head from "next/head";

export default function Contact() {
  return (
    <Layout title="Contact">
      <h2>Contact</h2>
      <ul>
        <li>
          <p>
            Email: <a href="mailto:bjarke.tobiesen@gmail.com">bjarke.tobiesen@gmail.com</a>
          </p>
        </li>
      </ul>
    </Layout>
  );
}
