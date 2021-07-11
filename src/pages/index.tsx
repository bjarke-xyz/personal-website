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
      <p>
        My name is Bjarke Tobiesen. I am currently studying{" "}
        <a href="https://www.sdu.dk/en/softwareteknologi">
          Software Technology
        </a>{" "}
        at University of Southern Denmark.
      </p>
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
        <a href="mailto:bjarke.tobiesen@gmail.com">
          <EmailIcon />
          <span>bjarke.tobiesen@gmail.com</span>
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
