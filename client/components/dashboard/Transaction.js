import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  gettingAccounts,
  gettingTransactions,
} from '../../store/accountReducer';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }
  async componentDidMount() {
    await this.props.gettingAccounts();
    console.log('hi', this.props.accounts);
    this.props.gettingTransactions(this.props.accounts);
    // await this.props.gettingTransactions(currentAccounts);

    const { accounts } = this.props;

    // this.props.gettingTransactions(accounts);
  }
  render() {
    return (
      <div>
        <h1>'i am coming here'</h1>
        {this.props.transactions.map(elem => (
          <h1>elem.amount</h1>
        ))}
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
});

const PlaidAccountTransactions = connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);

export default PlaidAccountTransactions;
