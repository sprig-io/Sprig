import React from 'react';
import { connect } from 'react-redux';
import { gettingAccounts } from '../../store/accountReducer';
import SummaryContainer from './SummaryContainer';
import axios from 'axios';

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
      this.setState({ loading: true, accountsExist: true });
    } else {
      this.setState({ loading: true });
    }
  }
  render() {
    const accounts = this.props.accounts;
    console.log(this.props.accounts, 'ACCOUNTS IN SUMMARY');
    return (
      <div>
        {this.state.loading && this.state.accountsExist ? (
          <div>
            <SummaryContainer accounts={accounts} />
          </div>
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
});

const mapDispatch = dispatch => ({
  gettingAccounts: () => dispatch(gettingAccounts()),
});

export default connect(
  mapState,
  mapDispatch
)(Summary);
