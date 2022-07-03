import { Layout } from "../components/layout";

export default function Contact() {
  return (
    <Layout title="Contact">
      <h2 className="text-3xl">Contact</h2>
      <ul>
        <li>
          <p>
            Email: <a href="mailto:hey@bjarke.xyz">hey@bjarke.xyz</a>
          </p>
        </li>
      </ul>
    </Layout>
  );
}
