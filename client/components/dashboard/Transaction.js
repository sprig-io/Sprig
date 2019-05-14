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
        Bank: element.accountName,
      });
    });

    const columns = ['Date', 'Category', 'Vendor', 'Amount', 'Bank'];

    return (
      <div className="containerTable">
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            style={{ width: '90%' }}
            title={'Transactions'}
            data={transData}
            columns={columns}
            options={{
              selectableRows: false,
              filter: false,
              viewColumns: false,
            }}
          />
        </MuiThemeProvider>
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
