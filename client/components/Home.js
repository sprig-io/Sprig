import React from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import Register from './Register';

const Home = () => {
  return (
    <div>
      <h1> Welcome to sprig</h1>
      <button>Register</button>
      <Register />
      <h6> Already a member ?</h6>
      <button> Login</button>
      <Login />
    </div>
  );
};
export default Home;
