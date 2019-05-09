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
  subscriptionFinder,
} from '../utils';

import Cards from './cards';

class InsightCard extends Component {
  async componentDidMount() {
    const { accounts } = this.props;
    this.props.gettingMonthlyTransactions(accounts);
  }
  render() {
    if (this.props.monthly.length) {
    }

    return (
      <div>
        <Cards />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  monthly: state.monthlyReducer.monthly,
  accounts: state.accountReducer.accounts,
});

const mapDispatchToProps = dispatch => ({
  gettingMonthlyTransactions: plaidAccountData =>
    dispatch(gettingMonthlyTransactions(plaidAccountData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsightCard);
