import React, { Component } from 'react';
<<<<<<< HEAD
import Summary from './Summary';
=======
>>>>>>> master
import ConnectedPlaidAccount from '../PlaidAccount';
import PlaidAccountTransactions from '../dashboard/Transaction';
import InsightCard from './insights/InsightCards';
import { connect } from 'react-redux';
<<<<<<< HEAD
=======
import CategoriesDonut from './CategoriesDonutChart';
>>>>>>> master

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return this.props.user.isAuthenticated ? (
      <div>
<<<<<<< HEAD
        <Summary />
        <InsightCard />
=======
        <CategoriesDonut />

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
