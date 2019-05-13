import React, { Component } from 'react';
import InsightCards from './InsightCards';

class InsightsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="insights-container">
        <div className="insight-graph">First Graph</div>
        <div className="insight-card">
          <InsightCards />
        </div>
        <div className="insight-graph">Second Graph </div>
        <div className="insight-card">Recommendations </div>
      </div>
    );
  }
}

export default InsightsPage;
