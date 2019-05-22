import React from "react";
import { connect } from "react-redux";
import { createdUser } from "../store/userReducer";
import { Link } from "react-router-dom";
import Login from "./Login";
import HomeIcon from "@material-ui/icons/Home";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errMessage: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      alert("Please logout to register as new user");
      this.props.history.push({
        pathname: "/dashboard"
      });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  async handleSubmit(event) {
    //this is where we wanna map dispatch the thunk?
    event.preventDefault();
    const emailValid = "@";
    const emailValid2 = ".";
    if (!this.state.name.match(/^([a-zA-Z0-9])/)) {
      this.setState({
        errMessage: "Please enter a valid name",
        name: "",
        email: "",
        password: "",
        password2: ""
      });
    } else if (
      !this.state.password.match(/^([a-zA-Z0-9])/) ||
      this.state.password !== this.state.password2
    ) {
      this.setState({
        errMessage:
          "Password cannot include space, please check password entered",
        name: "",
        email: "",
        password: "",
        password2: ""
      });
    } else if (this.state.password.length < 6) {
      this.setState({
        errMessage: "Password must contain atleast 6 characters",
        name: "",
        email: "",
        password: "",
        password2: ""
      });
    } else if (
      !this.state.email.split("").includes(emailValid) ||
      !this.state.email.split("").includes(emailValid2)
    ) {
      this.setState({
        errMessage: "Invalid Email",
        name: "",
        email: "",
        password: "",
        password2: ""
      });
    } else {
      await this.props.createdUser(this.state);
      const { errors } = this.props;
      if (errors.email === "Email already exists") {
        this.setState({
          errMessage: errors.email,
          name: "",
          email: "",
          password: "",
          password2: ""
        });
      } else {
        return this.props.history.push({
          pathname: "/login"
        });
      }
    }
  }
  render() {
    return (
      <div>
        <Link to="/" className="btn-flat waves-effect">
          <HomeIcon style={{ fontSize: 40, marginTop: "3px" }} />
        </Link>
        <div className="container">
          <h3 style={{ textAlign: "center", fontFamily: "Raleway" }}>
            Welcome to SPRIG!
          </h3>
          <h6
            style={{ textAlign: "center", fontFamily: "Raleway", color: "red" }}
          >
            {this.state.errMessage}
          </h6>
          <div className="row">
            <div className="col s6" style={{ marginLeft: "25%" }}>
              <div className="col s6" style={{ paddingLeft: "11.250px" }}>
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
                    style={{
                      marginLeft: "200px",
                      marginRight: "200px",
                      marginTop: "15px"
                    }}
                  />
                  <p
                    className="grey-text text-darken-1"
                    style={{ marginLeft: "160px" }}
                  >
                    Already have an account? <Link to="/Login">Log In</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.userReducer.user,
  errors: state.userReducer.errors,
  isAuthenticated: state.userReducer.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  createdUser: user => dispatch(createdUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

/* componentDidMount() {
  console.log("log from register page", this.props);
  console.log("this is history", this.props.history);
  if (this.props.currentUser.id !== 0) {
    this.props.history.push({
      pathname: "/dashboard"
    });
  }
} */
