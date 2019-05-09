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
        '#FC9F5B',
        '#2DC7FF',
        '#0A2342',
        '#048A81',
        '#FFBC42',
        '#ED6A5E',
        '#3423A6',
        '#FF70A6',
      ],
      hoverBackgroundColor: [
        '#f9c49c',
        '#8fd6f0',
        '#0c4183',
        '#0ac3b7',
        '#f0c981',
        '#f49087',
        '#574aab',
        '#f2a2c0',
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
