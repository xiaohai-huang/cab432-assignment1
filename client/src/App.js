import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import LoginForm from "./pages/LoginPage";
import ContentPage from "./pages/ContentPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <LoginForm />
        </Route>
        <Route path="/content">
          <ContentPage />
        </Route>
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
