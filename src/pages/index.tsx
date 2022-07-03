import { Layout } from "../components/layout";
import { EmailIcon, GitHubIcon } from "../components/icon";

export default function Home() {
  return (
    <Layout title="Hi 👋">
      <h2 className="text-3xl">Hi 👋</h2>
      <p>My name is Bjarke.</p>
      <hr className="my-2" />
      <p>Find me on:</p>
      <Socials />
    </Layout>
  );
}

const Socials = () => (
  <div>
    <ul>
      <li title="Email">
        <a href="mailto:hey@bjarke.xyz" className="inline-flex items-center">
          <EmailIcon />
          <span>hey@bjarke.xyz</span>
        </a>
      </li>
      <li title="GitHub">
        <a
          href="https://github.com/bjarke-xyz"
          className="inline-flex items-center"
        >
          <GitHubIcon />
          <span>bjarke-xyz</span>
        </a>
      </li>
    </ul>
  </div>
);
