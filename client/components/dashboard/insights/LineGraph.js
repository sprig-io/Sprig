import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [
        '#A8DADC',
        '#f9bd49',
        '#1D3557',
        // '#E63946',
        // '#FFE066',
        // '#dd9cd8',
      ],
      hoverBackgroundColor: [
        '#40bcc1',
        '#dda412',
        '#04142b',
        // '#8e3339',
        // '#f4e199',
        // 'AA78A6',
      ],
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

export default class LineGraph extends React.Component {
  render() {
    if ()



    return (
      <div>
        <Line />
      </div>
    );
  }
}
