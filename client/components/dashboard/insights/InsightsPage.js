import React, { Component } from 'react';
import InsightCards from './InsightCards';
import BarGraph from './BarGraph';
import { gettingAccounts } from '../../../store/accountReducer';
import { getThreeMonthsData } from '../../../store/insightReducer';
import { connect } from 'react-redux';

class InsightsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    await this.props.gettingAccounts();
    const { accounts } = this.props;
    console.log('ACCOUNTS', accounts);
    await this.props.getThreeMonthsData(accounts);
    console.log(this.props.threeMonthsData, 'THREE MONTHS DATA');
  }
  render() {
    return (
      <div id="insights-container">
        <div className="insight-graph">
          <BarGraph />
        </div>
        <div className="insight-card">
          <InsightCards />
        </div>
        <div className="insight-graph">Second Graph </div>
        <div className="insight-card">Recommendations </div>
      </div>
    );
  }
}

const mapState = state => ({
  accounts: state.accountReducer.accounts,
  threeMonthsData: state.insightReducer.threeMonthsData,
});

const mapDispatchToProps = dispatch => ({
  gettingAccounts: () => dispatch(gettingAccounts()),
  getThreeMonthsData: plaidAccountData =>
    dispatch(getThreeMonthsData(plaidAccountData)),
});

export default connect(
  mapState,
  mapDispatchToProps
)(InsightsPage);
