import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = {
  labels: [],
  datasets: [],
};

export default class BarGraph extends React.Component {
  constructor() {
    super();
  }
  render() {
    return <div>this is my bar graph</div>;
  }
}
