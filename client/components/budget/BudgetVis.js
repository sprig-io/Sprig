import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { getMonthsSpending } from './utils';

class BudgetVis extends Component {
  render() {
    const currentSpend = getMonthsSpending(this.props.transactions);
    const data = {
      labels: [
        `BUDGET: $${this.props.spendingLimit}`,
        `TOTAL SPENDING: $${currentSpend}`,
      ],

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
    const d = new Date();
    const month = new Array();
    month[0] = 'January';
    month[1] = 'February';
    month[2] = 'March';
    month[3] = 'April';
    month[4] = 'May';
    month[5] = 'June';
    month[6] = 'July';
    month[7] = 'August';
    month[8] = 'September';
    month[9] = 'October';
    month[10] = 'November';
    month[11] = 'December';

    const currentMonth = month[d.getMonth()];
    let currentSpend2 = getMonthsSpending(this.props.transactions);
    return (
      <div>
        {currentSpend2 > this.props.spendingLimit ? (
          <div className="headerBudg">
            <h4>
              You are{' '}
              <span id="overBudget">
                ${currentSpend2 - this.props.spendingLimit}{' '}
              </span>
              over budget
            </h4>
          </div>
        ) : (
          <div className="headerBudg">
            <h6 className="headerBudget">
              You are{' '}
              <span id="underBudget">
                ${this.props.spendingLimit - currentSpend2}
              </span>{' '}
              under budget
            </h6>
          </div>
        )}

        <div className="spending">
          <div>
            <Bar
              data={data}
              width={500}
              height={200}
              options={{
                maintainAspectRatio: false,
                legend: {
                  display: false,
                },

                responsive: false,
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
