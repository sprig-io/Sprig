import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  gettingAccounts,
  gettingTransactions,
} from '../../../store/accountReducer';
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
  }
  render() {
    if (this.props.transactions.length) {
      console.log(
        'amount spent on food and drink:',
        getCategorySpend(
          simplifyTransactions(this.props.transactions),
          'Food and Drink'
        )
      );
      console.log(
        'largest transaction',
        getLargestTransaction(this.props.transactions)
      );
      console.log(
        'largestByMerchant',
        largestByMerchant(this.props.transactions)
      );
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
});

const mapDispatchToProps = dispatch => ({
  gettingTransactions: plaidAccountData =>
    dispatch(gettingTransactions(plaidAccountData)),
  gettingAccounts: () => dispatch(gettingAccounts()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsightCard);
