import React, { Component } from 'react';
import SetBudget from './SetBudget';
import BudgetSummary from './BudgetSummary';
class BudgetIndex extends Component {
  render() {
    return (
      <div>
        <div className="spacer" />
        <BudgetSummary />
        <SetBudget />
      </div>
    );
  }
}

export default BudgetIndex;
