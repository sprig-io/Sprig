import React, { Component } from "react";
import Summary from "./Summary";
import ConnectedPlaidAccount from "../PlaidAccount";
import PlaidAccountTransactions from "../dashboard/Transaction";
import InsightCard from "./insights/InsightCards";
import { connect } from "react-redux";
import CategoriesDonut from "./CategoriesDonutChart";
import Navbar from "../Navbar";
import Footer from "../Footer";
import {
  gettingAccounts,
  gettingTransactions,
  gettingBalance
} from "../../store/accountReducer";
import {
  getLargest,
  getRestaurantSpend,
  getMerchantSpend,
  getTranspoSpend,
  getFees
} from "../../store/insightReducer";

import Loading from "./Loading";

import { logoutUser } from "../../store/userReducer";
import "../dashboard/Summary.css";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
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
            <div className="index">
              <Summary />
              <ConnectedPlaidAccount />
              <div className="lrg">
                <div className="insightCont">
                  <CategoriesDonut />
                </div>
                <InsightCard />
              </div>

              <PlaidAccountTransactions />

              <Footer />
            </div>
          </div>
        ) : this.state.loading && !this.props.accounts.length ? (
          <div>
            <Navbar />
            <br />
            <br />

            <ConnectedPlaidAccount />
            <h4 className="header">Please link an account to continue</h4>
            <Footer />
          </div>
        ) : (
          <div className="loading">
            <Loading />
            <h2 className="loading">Crunching the numbers</h2>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer,
  accounts: state.accountReducer.accounts,
  transactions: state.accountReducer.transactions
});
const mapDispatchToProps = dispatch => ({
  gettingTransactions: plaidAccountData =>
    dispatch(gettingTransactions(plaidAccountData)),
  gettingAccounts: () => dispatch(gettingAccounts()),
  logoutUser: () => dispatch(logoutUser()),
  gettingBalance: plaidAccountData =>
    dispatch(gettingBalance(plaidAccountData)),
  getLargest: props => dispatch(getLargest(props)),
  getRestaurantSpend: props => dispatch(getRestaurantSpend(props)),
  getMerchantSpend: props => dispatch(getMerchantSpend(props)),
  getTranspoSpend: props => dispatch(getTranspoSpend(props)),
  getFees: props => dispatch(getFees(props))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
