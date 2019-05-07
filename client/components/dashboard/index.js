import React, { Component } from "react";
import ConnectedPlaidAccount from "../PlaidAccount";
import PlaidAccountTransactions from "../dashboard/Transaction";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return this.props.location.isAuthenticated ? (
      <div>
        <PlaidAccountTransactions />
        <ConnectedPlaidAccount />
      </div>
    ) : (
      <ConnectedPlaidAccount />
    );
  }
}
