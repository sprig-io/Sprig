import React from 'react';
import { connect } from 'react-redux';
import { gettingAccounts, gettingBalance } from '../../store/accountReducer';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './Summary.css';
import { balancesCondensed } from './utils';

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
    console.log('Balance data', balanceData);

    return (
      <div>
        {this.state.loading && this.state.accountsExist ? (
          balanceData.map(
            (element, ind) => (
              // eslint-disable-next-line react/jsx-key
              <div key={ind}>
                <h4>Account Name: {element.accountName}</h4>
                <h4>Checking Balance: $ {element.Checking}</h4>
                <h4>Savings Balance: $ {element.Savings}</h4>
              </div>
            )

            // eslint-disable-next-line react/jsx-key
          )
        ) : !this.loading ? (
          <h1>Loading</h1>
        ) : (
          <h2>No accounts yet</h2>
        )}
      </div>
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
