import { Layout } from "../components/layout";
import { EmailIcon, GitHubIcon } from "../components/icon";

export default function Home() {
  return (
    <Layout title="Hi 👋">
      <style jsx>{`
        hr {
          margin-bottom: 5px;
          margin-top: 5px;
        }
      `}</style>
      <h2>Hi 👋</h2>
      <p>My name is Bjarke.</p>
      <hr />
      <p>Find me on:</p>
      <Socials />
    </Layout>
  );
}

const Socials = () => (
  <div>
    <style jsx>{`
      a {
        display: inline-flex;
        align-items: center;
      }
    `}</style>
    <ul>
      <li title="Email">
        <a href="mailto:hey@bjarke.xyz">
          <EmailIcon />
          <span>hey@bjarke.xyz</span>
        </a>
      </li>
      <li title="GitHub">
        <a href="https://github.com/bjarkt">
          <GitHubIcon />
          <span>bjarkt</span>
        </a>
      </li>
    </ul>
  </div>
);
