import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import Projects from "./pages/projects";
import Contact from "./pages/contact";
import NotFound from "./pages/notFound";
import Header from "./components/header";
import Footer from "./components/footer";

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/projects/" component={Projects} />
            <Route path="/contact/" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
