import React from "react";
import { ThemeSwitcherEmoji } from ".";
import styled from "@emotion/styled-base";

const FooterContainer = styled("footer")`
  margin-top: 50px;
  display: flex;
  font-size: 0.8em;

  div {
    flex: 50%;
  }

  .footer-2 div {
    float: right;
    cursor: pointer;
  }
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <div className="footer-1">
        © 2019 <a href="/">Bjarke Tobiesen</a>
      </div>
      <div className="footer-2">
        <ThemeSwitcherEmoji emoji="💡" />
      </div>
    </FooterContainer>
  );
};
