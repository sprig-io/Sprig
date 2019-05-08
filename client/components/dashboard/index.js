import React, { Component } from 'react';
import Summary from './Summary';
import ConnectedPlaidAccount from '../PlaidAccount';
import PlaidAccountTransactions from '../dashboard/Transaction';
import InsightCard from './insights/InsightCards';
import { connect } from 'react-redux';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return this.props.user.isAuthenticated ? (
      <div>
        <Summary />
        <InsightCard />
        <PlaidAccountTransactions />
        <ConnectedPlaidAccount />
      </div>
    ) : (
      <ConnectedPlaidAccount />
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer,
});

export default connect(
  mapStateToProps,
  null
)(Dashboard);
