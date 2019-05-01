import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "@emotion/styled";
import { Header, Footer, UseTitleSetter } from "./components";
import { Home, Projects, Contact, NotFound } from "./pages";

const Wrapper = styled("div")`
  background: ${props => props.theme.background};
  font-family: "Inconsolata", Monaco, monospace;
  font-size: 1.1em;
  height: 100%;
  min-height: 100vh;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  div {
    color: ${props => props.theme.body};
  }
  h1,
  h2 {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.highlight};
  }
  a:hover {
    text-decoration: underline;
  }
  ul {
    padding-left: 0px;

    li {
      list-style: none;
    }
  }
`;

const Container = styled("div")`
  max-width: 720px;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 1em;
  margin-right: auto;
  margin-left: auto;
`;

const App = () => {
  return (
    <Wrapper>
      <Container>
        <Router>
          <Header />
          <div>
            <Switch>
              <Route
                path="/"
                exact
                render={props => (
                  <UseTitleSetter component={<Home {...props} />} title="Hi" />
                )}
              />
              <Route
                path="/projects/"
                render={props => (
                  <UseTitleSetter
                    component={<Projects {...props} />}
                    title="Projects"
                  />
                )}
              />
              <Route
                path="/contact/"
                render={props => (
                  <UseTitleSetter
                    component={<Contact {...props} />}
                    title="Contact"
                  />
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </Router>
      </Container>
    </Wrapper>
  );
};

export default App;
