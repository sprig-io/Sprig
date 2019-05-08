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

const data = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [
        '#f95d6a',
        '#003f5c',
        '#ff7c43',
        '#665191',
        '#d45087',
        '#2f4b7c',
        '#ffa600',
        '#a05195',
      ],
      hoverBackgroundColor: [
        '#f95d6a',
        '#003f5c',
        '#ff7c43',
        '#665191',
        '#d45087',
        '#2f4b7c',
        '#ffa600',
        '#a05195',
      ],
    },
  ],
};
class CategoriesDonut extends Component {
  render() {
    if (this.props.transactions.length) {
      const donutInfo = allCategorySpend(this.props.transactions);
      data.datasets[0].data = donutInfo.spend;
      data.labels = donutInfo.labels;
    }
    return (
      <div>
        <div>
          <Doughnut data={data} />
        </div>
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
