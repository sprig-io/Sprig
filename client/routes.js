//Here is where the routes are gonna be

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login.js';

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    );
  }
}
