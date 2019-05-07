import React, { Component } from 'react';
import ConnectedPlaidAccount from '../PlaidAccount';
<<<<<<< HEAD
import PlaidAccountTransactions from './Transaction';
import Summary from './Summary';

export default class Dashboard extends Component {
=======
import PlaidAccountTransactions from '../dashboard/Transaction';
import { connect } from 'react-redux';
class Dashboard extends Component {
>>>>>>> master
  constructor(props) {
    super(props);
  }
  render() {
    return this.props.user.isAuthenticated ? (
      <div>
        <Summary />
        <PlaidAccountTransactions />
        <ConnectedPlaidAccount />
      </div>
    ) : (
      <ConnectedPlaidAccount />
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer,
});

export default connect(
  mapStateToProps,
  null
)(Dashboard);
