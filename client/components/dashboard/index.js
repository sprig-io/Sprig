import React, { Component } from "react";
import connectedPlaidAccount from "../PlaidAccount";
import plaidAccountTransactions from "../dashboard/Transaction";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    <connectedPlaidAccount />;
    <plaidAccountTransactions />;
  }
}
