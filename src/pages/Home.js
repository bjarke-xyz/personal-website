import React from "react";
import styled from "@emotion/styled";
import { EmailIcon, GitHubIcon, LinkedInIcon } from "../components";

const StyledHr = styled("hr")`
  margin-bottom: 5px;
  margin-top: 5px;
`;

const Socials = () => (
  <ul>
    <li>
      <a href="mailto:bjarke.tobiesen@gmail.com">
        <EmailIcon />
        <span>bjarke.tobiesen@gmail.com</span>
      </a>
    </li>
    <li>
      <a href="https://github.com/bjarkt">
        <span className="icon" />
        <GitHubIcon />
        <span>bjarkt</span>
      </a>
    </li>
    <li>
      <a href="https://www.linkedin.com/in/bjarke-tobiesen">
        <LinkedInIcon />
        <span>bjarke-tobiesen</span>
      </a>
    </li>
  </ul>
);

export const Home = props => {
  document.title = `Hi ${props.title}`;
  return (
    <section>
      <h2>Hi</h2>
      <p>
        My name is Bjarke Tobiesen. I am currently studying{" "}
        <a href="https://www.sdu.dk/en/softwareteknologi">
          Software Technology
        </a>{" "}
        at University of Southern Denmark.
      </p>
      <StyledHr />
      <p>Find me on:</p>
      <Socials />
    </section>
  );
};
