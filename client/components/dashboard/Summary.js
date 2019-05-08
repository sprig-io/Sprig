import React from 'react';
import { connect } from 'react-redux';
import { gettingAccounts, gettingBalance } from '../../store/accountReducer';

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
    const accounts = this.props.accounts;
    // console.log(this.props.balance, 'BALANCE IN SUMMARY');
    let temp = [];
    let types = ['Plaid Checking', 'Plaid Saving'];
    this.props.balance.forEach(function(element) {
      element.balance.forEach(function(ele) {
        temp.push({
          AccountName: element.accountName,
          AvailableBalance: ele.balances.available,
          CurrentBalance: ele.balances.current,
          Type: ele.name,
        });
      });
    });
    // balanceData array includes only Savings and Checkings
    const balanceData = temp.filter(data => types.includes(data.Type));
    return (
      <div>
        {this.state.loading && this.state.accountsExist ? (
          <div />
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
