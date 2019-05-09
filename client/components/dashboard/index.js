import React, { Component } from 'react';
import Summary from './Summary';
import ConnectedPlaidAccount from '../PlaidAccount';
import PlaidAccountTransactions from '../dashboard/Transaction';
import InsightCard from './insights/InsightCards';
import { connect } from 'react-redux';
import CategoriesDonut from './CategoriesDonutChart';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return this.props.user.isAuthenticated ? (
      <div>
        <Summary />
        <CategoriesDonut />

        <PlaidAccountTransactions />
        <InsightCard />
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
