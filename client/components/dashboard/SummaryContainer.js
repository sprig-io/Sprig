import React from 'react';

export default class SummaryContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.accounts.map(account => {
          return <div key={account._id}>{account.institutionName}</div>;
        })}
      </div>
    );
  }
}
