import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTable from "material-table";
import {
  gettingAccounts,
  gettingTransactions
} from "../../store/accountReducer";
import { logoutUser } from "../../store/userReducer";
import css from "./Summary.css";

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }
  async componentDidMount() {
    await this.props.gettingAccounts();
    const { accounts } = this.props;
    console.log("hi", this.props.accounts);
    await this.props.gettingTransactions(accounts);
    const { transactions } = this.props;
    this.props.gettingTransactions(accounts);
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    let transData = [];
    this.props.transactions.forEach(function(element) {
      element.transactions.forEach(function(ele) {
        transData.push({
          Name: element.accountName,
          Amount: ele.amount,
          category: ele.category[0],
          companyName: ele.name,
          date: ele.date
        });
      });
    });

    let columnNames = [
      { title: "Date", field: "date" },
      { title: "Category", field: "category" },
      { title: "Vendor", field: "companyName" },
      { title: "Amount", field: "Amount" },
      { title: "Bank Name", field: "Name" }
    ];
    return (
      <div style={{ maxWidth: "90%" }} className="tabletrans">
        <ReactTable
          title="Transactions"
          data={transData}
          columns={columnNames}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  accounts: state.accountReducer.accounts,
  transactions: state.accountReducer.transactions
});

const mapDispatchToProps = dispatch => ({
  gettingTransactions: plaidAccountData =>
    dispatch(gettingTransactions(plaidAccountData)),
  gettingAccounts: () => dispatch(gettingAccounts()),
  logoutUser: () => dispatch(logoutUser())
});

const PlaidAccountTransactions = connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);

export default PlaidAccountTransactions;
