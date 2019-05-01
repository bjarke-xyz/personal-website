import React from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled-base";

const StyledNav = styled("nav")`
  margin-bottom: 1em;
  a {
    color: ${props => props.theme.body};
    margin-right: 10px;
  }
  .is-active {
    color: ${props => props.theme.highlight};
  }
`;

export const Header = () => (
  <StyledNav>
    <NavLink activeClassName="is-active" exact to="/">
      Home
    </NavLink>
    <NavLink activeClassName="is-active" exact to="/projects">
      Projects
    </NavLink>
    <NavLink activeClassName="is-active" exact to="/contact">
      Contact
    </NavLink>
  </StyledNav>
);
