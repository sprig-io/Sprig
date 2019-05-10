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
import {
  getLargest,
  getRestaurantSpend,
  getMerchantSpend,
  getTranspoSpend,
  getFees,
} from '../../store/insightReducer';

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
    if (this.props.accounts.length) {
      await this.props.gettingTransactions(accounts);
      this.props.getLargest(this.props.transactions);
      this.props.getRestaurantSpend(this.props.transactions);
      this.props.getMerchantSpend(this.props.transactions);
      this.props.getTranspoSpend(this.props.transactions);
    }
    if (this.props.accounts.length) {
      await this.props.gettingBalance(this.props.accounts);
      this.setState({ loading: true });
    } else {
      this.setState({ loading: true });
    }
  }
  render() {
    return (
      <div>
        {this.state.loading && this.props.accounts.length ? (
          <div>
            <Navbar />
            <div className="index">
              <Summary />
              <CategoriesDonut />
              <InsightCard />
              <PlaidAccountTransactions />
              <ConnectedPlaidAccount />
            </div>
          </div>
        ) : !this.props.accounts.length ? (
          <div>
            <h2>No accounts yet</h2>
            <ConnectedPlaidAccount />
          </div>
        ) : (
          <h1>Loading</h1>
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
  getRestaurantSpend: props => dispatch(getRestaurantSpend(props)),
  getMerchantSpend: props => dispatch(getMerchantSpend(props)),
  getTranspoSpend: props => dispatch(getTranspoSpend(props)),
  getFees: props => dispatch(getFees(props)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
