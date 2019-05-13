import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from '../Navbar';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <div>
    <Navbar />
    <Route
      {...rest}
      render={props =>
        auth === true ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  </div>
);

const mapStateToProps = state => ({
  auth: state.userReducer.isAuthenticated,
});
export default connect(mapStateToProps)(PrivateRoute);
