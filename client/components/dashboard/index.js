import React, { Component } from "react";
import ConnectedPlaidAccount from "../PlaidAccount";
import PlaidAccountTransactions from "../dashboard/Transaction";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("this is this.props", this.props);
    console.log(this.props.location.isAuthenticated);
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

/* return (
  <div>
    <PlaidAccountTransactions />
    <ConnectedPlaidAccount />
  </div>
); */
