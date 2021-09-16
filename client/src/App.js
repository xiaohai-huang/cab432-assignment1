import React from "react";

import LoginForm from "./pages/LoginPage";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import ContentPage from "./pages/ContentPage";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
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
