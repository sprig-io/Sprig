import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  gettingAccounts,
  gettingTransactions,
} from '../../store/accountReducer';
import {
  getCategorySpend,
  getLargestTransaction,
  allCategorySpend,
} from './utils';
import Chart from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// const transactionChart = document.getElementById('transactionChart');
// console.log(transactionChart);

// const CategoriesDonut = new Chart(transactionChart, {
//   type: 'doughnut',
//   data: {
//     datasets: [
//       {
//         data: [10, 20, 30, 100],
//       },
//     ],
//   },
//   labels: ['Food', 'Transportation', 'Cheese', 'Non-alcoholic Beer'],
// });
const data = {
  labels: [],
  datasets: [
    {
      data: [],
    },
  ],
};

class CategoriesDonut extends Component {
  componentDidMount() {}

  render() {
    if (this.props.transactions.length) {
      console.log('transactions', this.props.transactions);
      const donutInfo = allCategorySpend(this.props.transactions);
      data.datasets.data = donutInfo.spend;
      data.labels = donutInfo.labels;
      console.log('DOOONUTTTT', donutInfo);
      console.log('dattaaaaa', data);
    }
    return (
      <div>
        <h1>SPRIG</h1>
        <Doughnut
          data={data}
          //   labels={['Food', 'Transportation', 'Cheese', 'Non-alcoholic Beer']}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  accounts: state.accountReducer.accounts,
  transactions: state.accountReducer.transactions,
});

export default connect(mapStateToProps)(CategoriesDonut);
