import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTable from "material-table";
//import * as startOfDay from 'date-fns';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    let transData = [];
    this.props.transactions.forEach(function(element) {
      transData.push({
        Name: element.accountName,
        Amount: element.amount,
        category: element.category[0],
        companyName: element.name,
        date: new Date(element.date).toDateString()
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
      <div
        style={{
          marginRight: "25px",
          marginLeft: "25px"
        }}
        className="tabletrans"
      >
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

const PlaidAccountTransactions = connect(mapStateToProps)(Transactions);

export default PlaidAccountTransactions;
