import React from "react";
import { Container } from "@material-ui/core";
import NavBar from "./components/navBar/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/auth/Auth";

const App = () => {
  return (
    <Router>
      <Container maxWidth="lg">
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
