import React from 'react';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';

const data = {
  labels: [],
  datasets: [],
};

class BarGraph extends React.Component {
  constructor() {
    super();
  }
  render() {
    console.log(this.props, 'BAR GRAPH PROPS');
    return <div>this is my bar graph</div>;
  }
}

const mapState = state => ({
  threeMonthsData: state.accountReducer.threeMonthsData,
});

export default connect(mapState)(BarGraph);
