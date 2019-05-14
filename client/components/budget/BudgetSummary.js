import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { getMonthsSpending } from './utils';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginLeft: '200px',
    marginRight: '200px',
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
  headers: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  amounts: {
    paddingRight: '10px',
    paddingTop: '20px',
    fontSize: '15px',
  },
  titles: {
    paddingTop: '20px',
    fontSize: '25px',
    fontWeight: 'bold',
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
          <Typography variant="h4">
            Monthly Budget for {currentMonth}
          </Typography>
          <div className={classes.headers}>
            <div className="col">
              <div className="titleNumber">
                <Typography
                  className={classes.titles}
                  variant="h5"
                  component="h3"
                >
                  ${this.props.budget}
                </Typography>
                <Typography className={classes.amounts} variant="subtitle1">
                  Savings Goal:
                </Typography>
              </div>
              <div className="titleNumber">
                <Typography
                  className={classes.titles}
                  variant="h5"
                  component="h3"
                >
                  ${this.props.monthlyIncome}
                </Typography>
                <Typography className={classes.amounts} variant="subtitle1">
                  Income:
                </Typography>
              </div>
            </div>
            <div className="col">
              <div className="titleNumber">
                <Typography
                  className={classes.titles}
                  variant="h5"
                  component="h3"
                >
                  ${this.props.spendingLimit}
                </Typography>
                <Typography className={classes.amounts} variant="subtitle1">
                  Spending Budget:
                </Typography>
              </div>
              <div className="titleNumber">
                {currentSpend > this.props.spendingLimit ? (
                  <Typography
                    className={classes.titles}
                    className={classes.red}
                    variant="h5"
                    component="h3"
                  >
                    ${currentSpend}
                  </Typography>
                ) : (
                  <Typography
                    className={classes.titles}
                    className={classes.green}
                    variant="h5"
                    component="h3"
                  >
                    ${currentSpend}
                  </Typography>
                )}
                <Typography className={classes.amounts} variant="subtitle1">
                  Current Spending:
                </Typography>
              </div>
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
