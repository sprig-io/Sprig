import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  gettingAccounts,
  gettingTransactions,
} from '../../../store/accountReducer';
import { gettingMonthlyTransactions } from '../../../store/monthlyReducer';
import {
  getCategorySpend,
  getLargestTransaction,
  simplifyTransactions,
  largestByMerchant,
} from '../utils';

class InsightCard extends Component {
  async componentDidMount() {
    await this.props.gettingAccounts();
    const { accounts } = this.props;
    this.props.gettingTransactions(accounts);
    this.props.gettingMonthlyTransactions(accounts);
  }
  render() {
    if (this.props.monthly.length) {
    }

    return (
      <div>
        <h1 />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  accounts: state.accountReducer.accounts,
  transactions: state.accountReducer.transactions,
  monthly: state.monthlyReducer.monthly,
});

const mapDispatchToProps = dispatch => ({
  gettingTransactions: plaidAccountData =>
    dispatch(gettingTransactions(plaidAccountData)),
  gettingAccounts: () => dispatch(gettingAccounts()),
  gettingMonthlyTransactions: plaidAccountData =>
    dispatch(gettingMonthlyTransactions(plaidAccountData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsightCard);
