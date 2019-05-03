import React from 'react';
import { connect } from 'react-redux';
import { loggedInUser } from '../store/userReducer';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    //this is where we wanna map dispatch the thunk?
    event.preventDefault();
    console.log(this.state, 'STATE');
    this.props.loggedInUser(this.state);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Password:
            <input
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Log In" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.userReducer.user,
  isLoggedIn: state.userReducer.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  loggedInUser: user => dispatch(loggedInUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);