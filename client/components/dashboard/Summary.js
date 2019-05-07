import React from 'react';

export default class Summary extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Account name goes here...</h1>
        <h2>$ in cash </h2>
      </div>
    );
  }
}
