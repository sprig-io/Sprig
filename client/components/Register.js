import React from 'react';
import { connect } from 'react-redux';
import { createdUser } from '../store/userReducer';
import { Link } from 'react-router-dom';
import Login from './Login';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
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
    this.props.createdUser(this.state);
    return this.props.history.push({
      pathname: '/login',
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s6 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i
                className="material-icons left"
                style={{ marginRight: '180px' }}
              />{' '}
              Back to home
            </Link>{' '}
            <div className="col s6" style={{ paddingLeft: '11.250px' }} />
            <br />
            <br />
            <form onSubmit={this.handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </label>
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
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Confirm Password:
                <input
                  type="password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.handleChange}
                />
              </label>
              <input
                type="submit"
                value="Register"
                className="btn btn-large waves-effect waves-light hoverable darkgreen accent-3"
                style={{ marginLeft: '200px' }}
              />
            </form>
            <p
              className="grey-text text-darken-1"
              style={{ marginLeft: '160px' }}
            >
              Already have an account? <Link to="/login">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.userReducer.user,
  isLoggedIn: state.userReducer.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  createdUser: user => dispatch(createdUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
