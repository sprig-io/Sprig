import React from 'react';
import { connect } from 'react-redux';
import { createdUser } from '../store/userReducer';
import { Link } from 'react-router-dom';
import Login from './Login';
import HomeIcon from '@material-ui/icons/Home';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errMessage: '',
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
    const emailValid = '@';
    const emailValid2 = '.';
    if (this.state.password !== this.state.password2) {
      this.setState({
        errMessage: 'Password does not match',
        name: '',
        email: '',
        password: '',
        password2: '',
      });
    } else if (this.state.password.length < 6) {
      this.setState({
        errMessage: 'Password must contain atleast 6 characters',
        name: '',
        email: '',
        password: '',
        password2: '',
      });
    } else if (
      !this.state.email.split('').includes(emailValid) ||
      !this.state.email.split('').includes(emailValid2)
    ) {
      this.setState({
        errMessage: 'Invalid Email',
        name: '',
        email: '',
        password: '',
        password2: '',
      });
    } else {
      this.props.createdUser(this.state);
      return this.props.history.push({
        pathname: '/login',
      });
    }
  }
  render() {
    return (
      <div>
        <Link to="/" className="btn-flat waves-effect">
          <HomeIcon style={{ fontSize: 40, marginTop: '3px' }} />
        </Link>
        <div className="container">
          <h3 style={{ textAlign: 'center', fontFamily: 'Raleway' }}>
            Welcome to SPRIG!
          </h3>
          <h6
            style={{ textAlign: 'center', fontFamily: 'Raleway', color: 'red' }}
          >
            {this.state.errMessage}
          </h6>
          <div className="row">
            <div className="col s6" style={{ marginLeft: '25%' }}>
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
                    required
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                  />
                </label>
                <label>
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                  />
                </label>
                <label>
                  Confirm Password:
                  <input
                    type="password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.handleChange}
                    required
                  />
                </label>
                <input
                  type="submit"
                  value="Register"
                  className=" btnThings btn btn-large waves-effect waves-light hoverable accent-3"
                  id="registerTwo"
                  style={{ marginLeft: '200px', marginTop: '10px' }}
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.userReducer.user,
  // isLoggedIn: state.userReducer.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  createdUser: user => dispatch(createdUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
