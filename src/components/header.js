import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header>
    <Link to="/">Home</Link>
    <Link to="/projects">Projects</Link>
    <Link to="/contact">Contact</Link>
  </header>
);

export default Header;
