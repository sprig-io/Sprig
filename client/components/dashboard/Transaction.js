import React, { Component } from "react";
import { connect } from "react-redux";
import { gettingTransactions } from "../../store/accountReducer";
import { addingAccount } from "../../store/accountReducer";

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }
  /* componentDidMount() {
    const { accounts } = this.props;
    this.props.gettingTransactions(accounts);
  } */
  render() {
    return (
      <div>
        <h1>'i am coming here'</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  accounts: state.accountReducer.accounts,
  transactions: state.accountReducer.transactions
});

const mapDispatchToProps = dispatch => ({
  gettingTransactions: plaidAccountData =>
    dispatch(gettingTransactions(plaidAccountData))
});

const plaidAccountTransactions = connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);

export default plaidAccountTransactions;
