import React from 'react';
import { Line } from 'react-chartjs-2';
import { finalLineGraphData } from '../utils';
import { gettingAccounts } from '../../../store/accountReducer';
import { getThreeMonthsDataCategory } from '../../../store/insightReducer';
import { connect } from 'react-redux';

const data = {
  labels: [],
  datasets: [
    {
      data: [],
      label: null,
      //   backgroundColor: ['#A8DADC', '#f9bd49', '#1D3557'],
      //   hoverBackgroundColor: ['#40bcc1', '#dda412', '#04142b'],
      borderColor: 'rgb(214, 214, 214)',
      hoverBorderColor: 'rgb(255,250,250)',
      fill: false,
    },
    {
      data: [],
      label: null,
      //   backgroundColor: ['#A8DADC', '#f9bd49', '#1D3557'],
      //   hoverBackgroundColor: ['#40bcc1', '#dda412', '#04142b'],
      borderColor: 'rgb(214, 214, 214)',
      hoverBorderColor: 'rgb(255,250,250)',
      fill: false,
    },
    {
      data: [],
      label: null,
      //   backgroundColor: ['#A8DADC', '#f9bd49', '#1D3557'],
      //   hoverBackgroundColor: ['#40bcc1', '#dda412', '#04142b'],
      borderColor: 'rgb(214, 214, 214)',
      hoverBorderColor: 'rgb(255,250,250)',
      fill: false,
    },
  ],
};

const options = {
  legend: {
    display: false,
    position: 'bottom',
    labels: {
      fontColor: 'black',
    },
  },
  layout: {
    padding: {
      left: 30,
      right: 50,
      top: 50,
      bottom: 40,
    },
    maintainAspectRatio: false,
    responsive: true,
  },
};

class LineGraph extends React.Component {
  constructor() {
    super();
  }
  async componentDidMount() {
    await this.props.gettingAccounts();
    const { accounts } = this.props;
    await this.props.getThreeMonthsDataCategory(accounts);
  }
  render() {
    if (this.props.threeMonthsCategory.length) {
      let lineData = this.props.threeMonthsCategory;
      console.log(lineData, 'lineData');
      let ind = 0;
      lineData.map(elem => {
        let label = Object.keys(elem)[0];
        data.labels.push(label);
        let spends = elem[label].spend;
        data.datasets[ind].data.push(...spends);
        console.log(elem, 'ELEM');
        let category = elem[label].labels;
        console.log(category, 'CATEGORY');
        data.datasets[ind].label = category[ind];
        ind += 1;
      });
      console.log(data, '***');
    }
    return (
      <div>
        <Line data={data} options={options} height={500} width={700} />
      </div>
    );
  }
}

const mapState = state => ({
  accounts: state.accountReducer.accounts,
  threeMonthsCategory: state.insightReducer.threeMonthsCategory,
});

const mapDispatchToProps = dispatch => ({
  gettingAccounts: () => dispatch(gettingAccounts()),
  getThreeMonthsDataCategory: plaidAccountData =>
    dispatch(getThreeMonthsDataCategory(plaidAccountData)),
});

export default connect(
  mapState,
  mapDispatchToProps
)(LineGraph);
