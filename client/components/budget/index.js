import React, { Component } from 'react';
import { connect } from 'react-redux';
import BudgetSummary from './BudgetSummary';
import BudgetVis from './BudgetVis';

import {
  gettingAccounts,
  gettingIncome,
  gettingTransactions,
} from '../../store/accountReducer';
import { gettingBudget } from '../../store/budgetReducer';
class BudgetIndex extends Component {
  async componentDidMount() {
    await this.props.gettingAccounts();
    await this.props.gettingTransactions(this.props.accounts);
    await this.props.gettingIncome(this.props.accounts);
    this.props.gettingBudget(this.props.user.id, this.props.income);
  }
  render() {
    return (
      <div>
        <div className="spacer" />
        <BudgetSummary />
        <div className="visContainer">
          <BudgetVis />
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  budget: state.budgetReducer.budget,
  income: state.accountReducer.monthlyIncome,
  user: state.userReducer.user,
  accounts: state.accountReducer.accounts,
  transactions: state.accountReducer.transactions,
  budget: state.budgetReducer.budget,
  spendingLimit: state.budgetReducer.spendingLimit,
});
const mapDispatchToProps = dispatch => ({
  gettingIncome: accounts => dispatch(gettingIncome(accounts)),
  gettingAccounts: () => dispatch(gettingAccounts()),
  gettingTransactions: accounts => dispatch(gettingTransactions(accounts)),
  gettingBudget: (userId, monthlyIncome) =>
    dispatch(gettingBudget(userId, monthlyIncome)),
});
export default connect(
  mapState,
  mapDispatchToProps
)(BudgetIndex);
