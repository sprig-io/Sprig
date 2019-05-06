//Here is where the routes are gonna be

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Dashboard from './components/dashboard/index.js';
import Home from './components/Home';
import Test from './components/Test';

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />

        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    );
  }
}
