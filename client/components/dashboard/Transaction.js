import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'material-table';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
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
      element.transactions.forEach(function(ele) {
        transData.push({
          Name: element.accountName,
          Amount: ele.amount,
          category: ele.category[0],
          companyName: ele.name,
          date: ele.date,
        });
      });
    });

    let columnNames = [
      { title: 'Bank Name', field: 'Name' },
      { title: 'Vendor', field: 'companyName' },
      { title: 'Category', field: 'category' },
      { title: 'Amount', field: 'Amount' },
      { title: 'Date', field: 'date' },
    ];
    return (
      <div style={{ maxWidth: '90%' }}>
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
  transactions: state.accountReducer.transactions,
});

const PlaidAccountTransactions = connect(mapStateToProps)(Transactions);

export default PlaidAccountTransactions;
