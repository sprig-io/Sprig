import React from 'react';
import { logoutUser } from '../store/userReducer';
import { connect } from 'react-redux';

class Navbar extends React.Component {
  constructor() {
    super();
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  render() {
    return (
      <nav>
        <div>
          <button onClick={this.onLogoutClick}>Log Out</button>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(
  null,
  mapDispatchToProps
)(Navbar);
