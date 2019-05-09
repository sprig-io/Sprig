import React from 'react';
import { connect } from 'react-redux';
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
  }
  async componentDidMount() {}
  render() {
    const balanceData = balancesCondensed(this.props.balance);
    return (
      <Paper className="root">
        <Table className="table">
          <TableHead>
            <TableRow className="row">
              <TableCell className="headerLeft">Bank Name</TableCell>
              <TableCell className="header">Checking</TableCell>
              <TableCell className="header">Savings</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {balanceData.map((row, ind) => (
              <TableRow key={ind}>
                <TableCell className="cellLeft" component="th" scope="row">
                  {row.accountName}
                </TableCell>
                <TableCell className="cell">${row.Checking}</TableCell>
                <TableCell className="cell">${row.Savings}</TableCell>
              </TableRow>
            ))}
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

export default connect(mapState)(Summary);
