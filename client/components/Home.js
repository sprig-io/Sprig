import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

class Home extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div style={{ height: '75vh' }} className="container valign-wrapper">
        <div className="row">
          <h4 style={{ margin: '85px' }} className="flow-text">
            <b>Welcome</b> to Sprig <br />
            <br />
            <span style={{ fontFamily: 'comic sans', margin: '5px' }}>
              SAVE $$$
            </span>{' '}
            with Sprig
          </h4>
          <br />
          <div className="col s6">
            <Link
              to="/register"
              style={{
                width: '240px',
                borderRadius: '3px',
                letterSpacing: '1.5px',
              }}
              className="btn btn-large waves-effect waves-light hoverable btnThings accent-3"
              id="register"
            >
              Register
            </Link>
          </div>
          <div className="col s6">
            <Link
              to="/login"
              style={{
                width: '240px',
                borderRadius: '3px',
                letterSpacing: '1.5px',
              }}
              className="btn btn-large waves-effect waves-light hoverable btnThings accent-3"
              id="login"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
