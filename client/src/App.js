import React from "react";

import LoginForm from "./pages/LoginPage";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import ContentPage from "./pages/ContentPage";
import { CssBaseline } from "@material-ui/core";
function App() {

  return (
    <Router>
      <CssBaseline />
      <Switch>
        <Route exact path="/login">
          <LoginForm />
        </Route>
        <Route path="/content">
          <ContentPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
