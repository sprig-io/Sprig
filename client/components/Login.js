import React from 'react';
import { connect } from 'react-redux';
import { loggedInUser } from '../store/userReducer';
import { Link } from 'react-router-dom';
import './dashboard/Summary.css';
import HomeIcon from '@material-ui/icons/Home';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push({
        pathname: '/dashboard',
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.push({
        pathname: '/dashboard',
      });
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    //this is where we wanna map dispatch the thunk?
    event.preventDefault();
    this.props.loggedInUser(this.state);
  }
  render() {
    return (
      <div>
        <Link to="/" className="btn-flat waves-effect">
          <HomeIcon style={{ fontSize: 40, marginTop: '3px' }} />
        </Link>

        <div className="container">
          <h3 style={{ textAlign: 'center', fontFamily: 'Raleway' }}>
            Welcome User!
          </h3>
          <div
            style={{
              marginTop: '5rem',
              display: 'flex',
              justifyContent: 'center',
            }}
            className="row"
          >
            <div className="col">
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
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </label>
                <input
                  className="btn btn-large waves-effect waves-light hoverable btnThings accent-3"
                  style={{ marginLeft: '40%', marginTop: '10px' }}
                  type="submit"
                  value="Log In"
                  id="registerTwo"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user,
  isAuthenticated: state.userReducer.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  loggedInUser: user => dispatch(loggedInUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
