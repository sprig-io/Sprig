import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  gettingAccounts,
  gettingTransactions,
} from '../../store/accountReducer';

import { logoutUser } from '../../store/userReducer';
class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }
  async componentDidMount() {
    await this.props.gettingAccounts();
    const { accounts } = this.props;
    console.log('hi', this.props.accounts);
    this.props.gettingTransactions(accounts);
    // await this.props.gettingTransactions(currentAccounts);

    // this.props.gettingTransactions(accounts);
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    return (
      <div>
        <h1>'i am coming here'</h1>
        {this.props.transactions.map(elem => (
          <h1>elem.amount</h1>
        ))}
        <button onClick={this.onLogoutClick}>Log Out</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  accounts: state.accountReducer.accounts,
  transactions: state.accountReducer.transactions,
});

const mapDispatchToProps = dispatch => ({
  gettingTransactions: plaidAccountData =>
    dispatch(gettingTransactions(plaidAccountData)),
  gettingAccounts: () => dispatch(gettingAccounts()),
  logoutUser: () => dispatch(logoutUser()),
});

const PlaidAccountTransactions = connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);

export default PlaidAccountTransactions;
