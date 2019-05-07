import React, { Component } from 'react';
import ConnectedPlaidAccount from '../PlaidAccount';
import PlaidAccountTransactions from './Transaction';
import Summary from './Summary';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return this.props.location.isAuthenticated ? (
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
