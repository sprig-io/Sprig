import React from 'react';
import { connect } from 'react-redux';
import { gettingAccounts, gettingBalance } from '../../store/accountReducer';
import './Summary.css';
import { balancesCondensed } from './utils';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      accountsExist: false,
    };
  }
  async componentDidMount() {
    await this.props.gettingAccounts();
    if (this.props.accounts.length) {
      await this.props.gettingBalance(this.props.accounts);
      this.setState({ loading: true, accountsExist: true });
    } else {
      this.setState({ loading: true });
    }
  }
  render() {
    const balanceData = balancesCondensed(this.props.balance);
    console.log(balanceData, 'BALANCEDATA');

    return (
      <Paper className="root">
        <Table className="table">
          <TableHead>
            <TableRow className="row">
              <TableCell className="header">Bank Name</TableCell>
              <TableCell className="header">Checking</TableCell>
              <TableCell className="header">Savings</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.loading && this.state.accountsExist ? (
              balanceData.map((row, ind) => (
                <TableRow key={ind}>
                  <TableCell className="cell" component="th" scope="row">
                    {row.accountName}
                  </TableCell>
                  <TableCell className="cell">${row.Checking}</TableCell>
                  <TableCell className="cell">${row.Savings}</TableCell>
                </TableRow>
              ))
            ) : !this.loading ? (
              <h6>Loading</h6>
            ) : (
              <h6>No linked accounts</h6>
            )}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const mapState = state => ({
  accounts: state.accountReducer.accounts,
  balance: state.accountReducer.balance,
});

const mapDispatch = dispatch => ({
  gettingAccounts: () => dispatch(gettingAccounts()),
  gettingBalance: plaidAccountData =>
    dispatch(gettingBalance(plaidAccountData)),
});

export default connect(
  mapState,
  mapDispatch
)(Summary);
