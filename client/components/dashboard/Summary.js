import React from 'react';
import { connect } from 'react-redux';
import './Summary.css';
import { balancesCondensed } from './utils';

class Summary extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {}
  render() {
    const balanceData = balancesCondensed(this.props.balance);
    return (
      <div>
        {balanceData.map(
          (element, ind) => (
            // eslint-disable-next-line react/jsx-key
            <div key={ind}>
              <h4>Account Name: {element.accountName}</h4>
              <h4>Checking Balance: $ {element.Checking}</h4>
              <h4>Savings Balance: $ {element.Savings}</h4>
            </div>
          )
          // eslint-disable-next-line react/jsx-key
        )}
      </div>
    );
  }
}

const mapState = state => ({
  accounts: state.accountReducer.accounts,
  balance: state.accountReducer.balance,
});

export default connect(mapState)(Summary);
