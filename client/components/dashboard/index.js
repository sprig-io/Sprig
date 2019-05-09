import React, { Component } from 'react';
import Summary from './Summary';
import ConnectedPlaidAccount from '../PlaidAccount';
import PlaidAccountTransactions from '../dashboard/Transaction';
import InsightCard from './insights/InsightCards';
import { connect } from 'react-redux';
import CategoriesDonut from './CategoriesDonutChart';
import Navbar from '../Navbar';
import {
  gettingAccounts,
  gettingTransactions,
  gettingBalance,
} from '../../store/accountReducer';
import { gettingMonthlyTransactions } from '../../store/monthlyReducer';
import { getLargest } from '../../store/insightReducer';

import { logoutUser } from '../../store/userReducer';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      accountsExist: false,
    };
  }
  async componentDidMount() {
    await this.props.gettingAccounts();
    const { accounts } = this.props;
    await this.props.gettingTransactions(accounts);
    await this.props.getLargest(this.props.transactions);
    if (this.props.accounts.length) {
      await this.props.gettingBalance(this.props.accounts);
      this.setState({ loading: true, accountsExist: true });
    } else {
      this.setState({ loading: true });
    }
  }
  render() {
    return (
      <div>
        {this.state.loading &&
        this.props.user.isAuthenticated &&
        this.state.accountsExist ? (
          <div>
            <Navbar />
            <Summary />
            <CategoriesDonut />
            <InsightCard />
            <PlaidAccountTransactions />
            <ConnectedPlaidAccount />
          </div>
        ) : !this.state.loading ? (
          <h1>Loading</h1>
        ) : !this.props.user.isAuthenticated ? (
          <h1>try logging in again </h1>
        ) : (
          <div>
            <h2>No accounts yet</h2>
            <ConnectedPlaidAccount />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer,
  accounts: state.accountReducer.accounts,
  transactions: state.accountReducer.transactions,
});
const mapDispatchToProps = dispatch => ({
  gettingTransactions: plaidAccountData =>
    dispatch(gettingTransactions(plaidAccountData)),
  gettingAccounts: () => dispatch(gettingAccounts()),
  logoutUser: () => dispatch(logoutUser()),
  gettingBalance: plaidAccountData =>
    dispatch(gettingBalance(plaidAccountData)),
  gettingMonthlyTransactions: plaidAccountData =>
    dispatch(gettingMonthlyTransactions(plaidAccountData)),
  getLargest: props => dispatch(getLargest(props)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
