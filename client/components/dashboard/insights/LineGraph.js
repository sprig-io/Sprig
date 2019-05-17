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
      data: [0, 0, 0],
      label: 'Food and Drink',
      borderColor: '#A8DADC',
      hoverBorderColor: '#40bcc1',
      fill: false,
    },
    {
      data: [0, 0, 0],
      label: 'Shops',
      borderColor: '#f9bd49',
      hoverBorderColor: '#dda412',
      fill: false,
    },
    {
      data: [0, 0, 0],
      label: 'Travel',
      borderColor: '#1D3557',
      hoverBorderColor: '#04142b',
      fill: false,
    },
    {
      data: [0, 0, 0],
      label: 'Recreation',
      borderColor: '#E63946',
      hoverBorderColor: '#8e3339',
      fill: false,
    },
  ],
};

const options = {
  legend: {
    display: true,
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
    this.state = { data: data };
    this.populateData = this.populateData.bind(this);
  }
  async componentDidMount() {
    await this.props.gettingAccounts();
    const { accounts } = this.props;
    await this.props.getThreeMonthsDataCategory(accounts);
    this.populateData();
  }

  populateData() {
    if (this.props.threeMonthsCategory.length) {
      let catsArray = ['Food and Drink', 'Shops', 'Travel', 'Recreation'];
      let lineData = this.props.threeMonthsCategory;
      lineData.map((elem, index) => {
        console.log('elem', elem);
        let label = Object.keys(elem)[0];
        if (!data.labels.includes(label)) {
          data.labels.push(label);
        }
        elem[label].labels.map((categories, ind) => {
          let catIndex = catsArray.indexOf(categories);
          data.datasets[catIndex].data[index] +=
            Math.round(elem[label].spend[ind] * 100) / 100;
        });
      });
      this.setState({ data: data });
    }
  }
  render() {
    return this.props.threeMonthsCategory.length ? (
      <div>
        <Line data={data} options={options} height={400} width={450} />
      </div>
    ) : (
      <div />
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
