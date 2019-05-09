//Here is where the routes are gonna be

import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Dashboard from './components/dashboard/index.js';
import Home from './components/Home';
import PrivateRoute from './components/private-route/PrivateRoute';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { fetchUser, logoutUser } from './store/userReducer';
import store from './store';
import { Provider } from 'react-redux';
import Navbar from './components/Navbar';

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
          {/* <Navbar /> */}
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />

          <Route exact path="/register" component={Register} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
