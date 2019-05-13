import React, { Component } from 'react';
import { addingBudget } from '../store/budgetReducer';
import { connect } from 'react-redux';

const Account = require('../../models/Account');
const User = require('../../models/User');
class Budget extends Component {
  componentDidMount() {
    this.props.addingBudget({
      userId: this.props.user.id,
      monthlyGoal: '5000',
    });
  }
  render() {
    return <div>hello budget</div>;
  }
}
const mapState = state => ({
  budget: state.budgetReducer.budget,
  user: state.userReducer.user,
});

const mapDispatchToProps = dispatch => ({
  addingBudget: budgetData => dispatch(addingBudget(budgetData)),
});

export default connect(
  mapState,
  mapDispatchToProps
)(Budget);
