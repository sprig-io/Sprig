//Here is where the routes are gonna be

import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Home from "./components/Home.js";

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}
