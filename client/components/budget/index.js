import React, { Component } from 'react';
import SetBudget from './SetBudget';
import { connect } from 'react-redux';
import BudgetSummary from './BudgetSummary';
import {
  gettingAccounts,
  gettingIncome,
  gettingTransactions,
} from '../../store/accountReducer';
import { gettingBudget } from '../../store/budgetReducer';
class BudgetIndex extends Component {
  async componentDidMount() {
    await this.props.gettingAccounts();
    this.props.gettingTransactions(this.props.accounts);
    this.props.gettingIncome(this.props.accounts);
    this.props.gettingBudget(this.props.user.id);
  }
  render() {
    console.log('income!', this.props.user.id);
    return (
      <div>
        <div className="spacer" />
        <BudgetSummary />
        <SetBudget />
      </div>
    );
  }
}

const mapState = state => ({
  budget: state.budgetReducer.budget,
  income: state.budgetReducer.income,
  user: state.userReducer.user,
  accounts: state.accountReducer.accounts,
  transactions: state.accountReducer.transactions,
  budget: state.budgetReducer.budget.monthlyGoal,
});
const mapDispatchToProps = dispatch => ({
  gettingIncome: accounts => dispatch(gettingIncome(accounts)),
  gettingAccounts: () => dispatch(gettingAccounts()),
  gettingTransactions: accounts => dispatch(gettingTransactions(accounts)),
  gettingBudget: userId => dispatch(gettingBudget(userId)),
});
export default connect(
  mapState,
  mapDispatchToProps
)(BudgetIndex);
