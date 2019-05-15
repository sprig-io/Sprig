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
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import { deletingAccount } from '../../store/accountReducer';

class Summary extends React.Component {
  constructor(props) {
    super(props);

    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove = async accountName => {
    const targetAccount = this.props.accounts.filter(
      elem => elem.institutionName === accountName
    );
    let accountId = targetAccount[0]._id;
    await this.props.deletingAccount(accountId);
    window.location.reload();
  };
  async componentDidMount() {}
  render() {
    const balanceData = balancesCondensed(this.props.balance);
    return (
      <div>
        <Paper className="root">
          <Table className="table">
            <TableHead>
              <TableRow className="row">
                <TableCell className="headerLeft">Bank Name </TableCell>
                <TableCell className="header">Checking</TableCell>
                <TableCell className="header">Savings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {balanceData.map((row, ind) => (
                <TableRow key={ind}>
                  <TableCell className="cellLeft" component="th" scope="row">
                    <DeleteOutlinedIcon
                      onClick={() => {
                        if (
                          window.confirm(
                            'Are you sure you wish to delete this bank account'
                          )
                        )
                          this.handleRemove(row.accountName);
                      }}
                    />
                    {''}
                    {row.accountName}
                  </TableCell>
                  <TableCell className="cell">${row.Checking}</TableCell>
                  <TableCell className="cell">${row.Savings}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

const mapState = state => ({
  accounts: state.accountReducer.accounts,
  balance: state.accountReducer.balance,
});

const mapDispatchToProps = dispatch => ({
  deletingAccount: accountId => dispatch(deletingAccount(accountId)),
});

export default connect(
  mapState,
  mapDispatchToProps
)(Summary);
