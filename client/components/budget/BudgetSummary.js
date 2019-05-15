import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SetBudget from './SetBudget';
import { getMonthsSpending } from './utils';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginLeft: '150px',
    marginRight: '150px',
  },

  red: {
    color: 'rgba(245, 111, 82, 1)',
    paddingTop: '20px',
    fontSize: '25px',
    fontWeight: 'bold',
  },
  green: {
    color: 'green',
    paddingTop: '20px',
    fontSize: '25px',
    fontWeight: 'bold',
  },
  savingsGoal: {
    display: 'flex',
  },

  amounts: {
    paddingRight: '10px',
    paddingTop: '20px',
    fontSize: '20px',
  },
  budget: {
    fontSize: '20px',
  },
  titles: {
    paddingTop: '20px',
    fontSize: '25px',
    fontWeight: 'bold',
    color: '#4c9f70',
  },
});

class BudgetSummaryComp extends React.Component {
  constructor(props) {
    super(props);
  }

  render(props) {
    const { classes } = this.props;
    const d = new Date();
    const month = new Array();
    month[0] = 'January';
    month[1] = 'February';
    month[2] = 'March';
    month[3] = 'April';
    month[4] = 'May';
    month[5] = 'June';
    month[6] = 'July';
    month[7] = 'August';
    month[8] = 'September';
    month[9] = 'October';
    month[10] = 'November';
    month[11] = 'December';

    const currentMonth = month[d.getMonth()];
    const currentSpend = getMonthsSpending(this.props.transactions);
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <div id="monthHeader">
            <Typography variant="h4">{currentMonth} Budget</Typography>
          </div>

          <div className="col">
            <div className="titleNumber2">
              <Typography
                className={classes.titles}
                variant="h5"
                component="h3"
              >
                ${this.props.monthlyIncome}
              </Typography>
              <Typography
                className={classes.titles}
                variant="h5"
                component="h3"
              >
                ${this.props.budget}
              </Typography>
            </div>

            <div className="titleNumber">
              <Typography className={classes.amounts} variant="subtitle1">
                Income:
              </Typography>
              <div className={classes.savingsGoal}>
                <Typography className={classes.amounts} variant="subtitle1">
                  Savings Goal:
                </Typography>
                <SetBudget />
              </div>
            </div>
          </div>
          <hr size="2" width="550" />
          <div className="col2">
            <div className="titleNumber2">
              <Typography
                className={classes.budget}
                variant="h5"
                component="h3"
              >
                Your spending limit for May is{' '}
                <span id="limit"> ${this.props.spendingLimit}</span>
              </Typography>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

BudgetSummaryComp.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapState = state => ({
  budget: state.budgetReducer.budget,
  user: state.userReducer.user,
  accounts: state.accountReducer.accounts,
  income: state.accountReducer.income,
  monthlyIncome: state.accountReducer.monthlyIncome,
  transactions: state.accountReducer.transactions,
  spendingLimit: state.budgetReducer.spendingLimit,
});

const BudgetSummary = connect(
  mapState,
  null
)(BudgetSummaryComp);

export default withStyles(styles)(BudgetSummary);
