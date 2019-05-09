import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  gettingAccounts,
  gettingTransactions,
} from '../../../store/accountReducer';
import { gettingMonthlyTransactions } from '../../../store/monthlyReducer';
import { getLargest } from '../../../store/insightReducer';
import Cards from './cards';

class InsightCard extends Component {
  render() {
    return (
      <div>
        <Cards />
        <h1>{this.props.largest.merchant}</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  transactions: state.accountReducer.transactions,
  largest: state.insightReducer.largest,
});

export default connect(mapStateToProps)(InsightCard);
