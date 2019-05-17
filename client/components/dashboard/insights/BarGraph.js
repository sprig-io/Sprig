import React from 'react';
import { Bar } from 'react-chartjs-2';
import { condenseTotalMonthly } from '../utils';

const data = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: ['#A8DADC', '#f9bd49', '#1D3557'],
      hoverBackgroundColor: ['#40bcc1', '#dda412', '#04142b'],
      borderColor: 'rgb(214, 214, 214)',
      hoverBorderColor: 'rgb(255,250,250)',
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

export default class BarGraph extends React.Component {
  constructor() {
    super();
  }
  render() {
    if (this.props.threeMonthsData) {
      const barInfo = condenseTotalMonthly(this.props.threeMonthsData[0]);
      barInfo.total = barInfo.total.map(elem => Math.round(elem * 100) / 100);
      data.datasets[0].data = barInfo.total;
      data.labels = barInfo.labels;
    }
    return (
      <div className="barGraphContainer">
        <Bar data={data} options={options} height={400} width={450} />
      </div>
    );
  }
}
