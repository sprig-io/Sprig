import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { getMonthsSpending } from './utils';

class BudgetVis extends Component {
  render() {
    const currentSpend = getMonthsSpending(this.props.transactions);
    const data = {
      labels: [`BUDGET: $${this.props.budget}`, `SPENDING: $${currentSpend}`],

      datasets: [
        {
          backgroundColor: ['rgb(143, 167, 238)', 'rgba(245, 111, 82, 1)'],
          borderColor: ['rgb(143, 167, 238)', 'rgba(245, 111, 82, 1)'],
          borderWidth: 1,
          hoverBackgroundColor: ['rgb(143, 167, 238)', 'rgba(245, 111, 82, 1)'],
          hoverBorderColor: ['rgb(143, 167, 238)', 'rgba(245, 111, 82, 1)'],
          data: [this.props.spendingLimit, currentSpend],
        },
      ],
    };
    return (
      <div>
        <div className="spending">
          <h5 />
          <Bar
            data={data}
            width={150}
            height={200}
            options={{
              maintainAspectRatio: false,
              legend: {
                display: false,
              },
              responsive: true,
              scales: {
                xAxes: [
                  {
                    barPercentage: 1,

                    minBarLength: 2,
                    gridLines: {
                      display: false,
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      min: 0,

                      stepSize: 200,
                    },
                    barPercentage: 0.5,
                    gridLines: {
                      display: false,
                    },
                    display: false,
                  },
                ],
              },
            }}
          />
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  budget: state.budgetReducer.budget,
  user: state.userReducer.user,
  accounts: state.accountReducer.accounts,
  income: state.accountReducer.income,
  monthlyIncome: state.accountReducer.monthlyIncome,
  transactions: state.accountReducer.transactions,
  spendingLimit: state.budgetReducer.spendingLimit,
});
export default connect(
  mapState,
  null
)(BudgetVis);
