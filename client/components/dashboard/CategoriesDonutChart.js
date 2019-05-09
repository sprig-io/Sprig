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
        '#A0ECD0',
        '#A8DADC',
        '#1D3557',
        '#E63946',
        '#FFE066',
        '#dd9cd8',
      ],
      hoverBackgroundColor: [
        '#10b075',
        '#40bcc1',
        '#04142b',
        '#8e3339',
        '#f4e199',
        'AA78A6',
      ],
    },
  ],
};
const options = {
  legend: {
    display: true,
    position: 'right',
    labels: {},
  },
  layout: {
    padding: {
      left: 50,
      right: 50,
      top: 50,
      bottom: 40,
    },
    maintainAspectRatio: false,
  },
};
class CategoriesDonut extends Component {
  render() {
    if (this.props.transactions.length) {
      const donutInfo = allCategorySpend(this.props.transactions);

      donutInfo.spend = donutInfo.spend.map(
        elem => Math.round(elem * 100) / 100
      );
      console.log('donut infooooo', donutInfo.spend);

      data.datasets[0].data = donutInfo.spend;
      data.labels = donutInfo.labels;
    }
    return (
      <div>
        <div>
          <Doughnut data={data} options={options} width={50} height={50} />
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
