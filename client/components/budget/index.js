import React, { Component } from 'react';
import SetBudget from './SetBudget';
import { connect } from 'react-redux';
import BudgetSummary from './BudgetSummary';
import { gettingAccounts, gettingIncome } from '../../store/accountReducer';
class BudgetIndex extends Component {
  async componentDidMount() {
    await this.props.gettingAccounts();
    this.props.gettingIncome(this.props.accounts);
  }
  render() {
    console.log('income!', this.props.accounts);
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
});
const mapDispatchToProps = dispatch => ({
  gettingIncome: accounts => dispatch(gettingIncome(accounts)),
  gettingAccounts: () => dispatch(gettingAccounts()),
});
export default connect(
  mapState,
  mapDispatchToProps
)(BudgetIndex);
