import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { getMonthsSpending, getSpendLimit } from './utils';
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginLeft: '200px',
    marginRight: '200px',
  },
  titles: {
    paddingTop: '40px',
  },
  headers: {
    display: 'flex',
    justifyContent: 'space-around',
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
          <Typography variant="h4">{currentMonth}</Typography>

          <div className={classes.headers}>
            <div>
              <Typography
                className={classes.titles}
                variant="h5"
                component="h3"
              >
                {getSpendLimit(
                  this.props.monthlyIncome,
                  this.props.budget
                ).toString()}
              </Typography>
              <Typography className={classes.amounts} variant="subtitle1">
                Spending Limit
              </Typography>
            </div>
            <div>
              <Typography
                className={classes.titles}
                variant="h5"
                component="h3"
              >
                {currentSpend}
              </Typography>
              <Typography className={classes.amounts} variant="subtitle1">
                Spending So Far
              </Typography>
            </div>
            <div>
              <Typography
                className={classes.titles}
                variant="h5"
                component="h3"
              >
                ${this.props.monthlyIncome}
              </Typography>
              <Typography className={classes.amounts} variant="subtitle1">
                Expected Income
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
  budget: state.budgetReducer.budget.monthlyGoal,
  user: state.userReducer.user,
  accounts: state.accountReducer.accounts,
  income: state.accountReducer.income,
  monthlyIncome: state.accountReducer.monthlyIncome,
  transactions: state.accountReducer.transactions,
});

const BudgetSummary = connect(
  mapState,
  null
)(BudgetSummaryComp);

export default withStyles(styles)(BudgetSummary);
