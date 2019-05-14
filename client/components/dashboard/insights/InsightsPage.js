import React, { Component } from 'react';
import InsightCards from './InsightCards';
import BarGraph from './BarGraph';
import { getThreeMonthsData } from '../../../store/insightReducer';
import {
  gettingAccounts,
  gettingTransactions,
} from '../../../store/accountReducer';
import { connect } from 'react-redux';
import LineGraph from './LineGraph';

class InsightsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    await this.props.gettingAccounts();
    const { accounts } = this.props;
    await this.props.gettingTransactions(accounts);
    await this.props.getThreeMonthsData(accounts);
  }
  render() {
    return (
      <div id="insights-container">
        <div className="insight-graph">
          <BarGraph threeMonthsData={[this.props.threeMonthsData]} />
        </div>
        <div className="insight-card">
          <InsightCards />
        </div>
        <div className="insight-graph">
          <LineGraph transactions={this.props.transactions} />
        </div>
        <div className="insight-card">Recommendations </div>
      </div>
    );
  }
}

const mapState = state => ({
  accounts: state.accountReducer.accounts,
  threeMonthsData: state.insightReducer.threeMonthsData,
  transactions: state.accountReducer.transactions,
});

const mapDispatchToProps = dispatch => ({
  getThreeMonthsData: plaidAccountData =>
    dispatch(getThreeMonthsData(plaidAccountData)),
  gettingAccounts: () => dispatch(gettingAccounts()),
  gettingTransactions: plaidAccountData =>
    dispatch(gettingTransactions(plaidAccountData)),
});

export default connect(
  mapState,
  mapDispatchToProps
)(InsightsPage);
