import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

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

  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableBodyCell: {
          root: {
            backgroundColor: 'white',
            maxwidth: '50%',
            padding: '8px',
            leftmargin: '50px',
            rightmargin: '50px',
          },
        },
      },
    });
  render() {
    let transData = [];
    this.props.transactions.forEach(function(element) {
      transData.push({
        Date: new Date(element.date).toDateString(),
        Category: element.category[0],
        Vendor: element.name,
        Amount: element.amount,
        category: element.category[0],
        companyName: element.name,
        date: new Date(element.date).toDateString(),
      });
    });

    let columnNames = [
      { title: 'Date', field: 'date' },
      { title: 'Category', field: 'category' },
      { title: 'Vendor', field: 'companyName' },
      { title: 'Amount', field: 'Amount' },
      { title: 'Bank Name', field: 'Name' },
    ];
    return (
      <div
        style={{
          marginRight: '25px',
          marginLeft: '25px',
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
  transactions: state.accountReducer.transactions,
});

const PlaidAccountTransactions = connect(mapStateToProps)(Transactions);

export default PlaidAccountTransactions;
