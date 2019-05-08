import React, { Component } from 'react';
import ConnectedPlaidAccount from '../PlaidAccount';
import Summary from './Summary';
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
<<<<<<< HEAD
        <Summary />
=======
        <InsightCard />
>>>>>>> master
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
