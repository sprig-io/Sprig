//Here is where the routes are gonna be

import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Footer from './components/Footer';
import Dashboard from './components/dashboard/index.js';
import Home from './components/Home';
import PrivateRoute from './components/private-route/PrivateRoute';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { fetchUser, logoutUser } from './store/userReducer';
import store from './store';
import { Provider } from 'react-redux';
import BudgetIndex from './components/budget';
import PlaidAccount from './components/PlaidAccount';
import InsightsPage from './components/dashboard/insights/InsightsPage';
import About from './components/About';

if (localStorage.jwt) {
  // Set auth token header auth
  const token = localStorage.jwt;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(fetchUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = './login';
  }
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />

          <Route exact path="/register" component={Register} />
          <Switch>
            <PrivateRoute exact path="/budget" component={BudgetIndex} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/addAccount" component={PlaidAccount} />
            <PrivateRoute exact path="/insights" component={InsightsPage} />
            <PrivateRoute exact path="/about" component={About} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
