import React, { Component } from 'react';
import InsightCards from './InsightCards';
import BarGraph from './BarGraph';
import Footer from '../../Footer';
import Loading from '../Loading';
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
    this.state = {
      loading: false,
    };
  }
  async componentDidMount() {
    await this.props.gettingAccounts();
    const { accounts } = this.props;
    await this.props.getThreeMonthsData(accounts);
    this.setState({ loading: true });
  }
  render() {
    return (
      <div>
        {this.state.loading ? (
          <div>
            <div id="insights-container">
              <div className="insight-graph">
                <div className="insights-title">
                  Three Months Total Spending
                </div>
                <BarGraph threeMonthsData={[this.props.threeMonthsData]} />
              </div>
              <div className="insight-graph">
                <div className="insights-title">
                  Three Months Spending by Category
                </div>
                <LineGraph />
              </div>
            </div>
            <Footer />
          </div>
        ) : (
          <div className="loading">
            <Loading />
            <h2 className="loading">Calculating insights</h2>
          </div>
        )}
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
