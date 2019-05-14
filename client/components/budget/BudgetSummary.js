import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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

    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h4">{month[d.getMonth()]}</Typography>
          <Typography variant="h3">{this.props.income}</Typography>
          <div className={classes.headers}>
            <div>
              <Typography
                className={classes.titles}
                variant="h5"
                component="h3"
              >
                $5000
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
                $4000
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
                {this.props.income}
              </Typography>
              <Typography className={classes.amounts} variant="subtitle1">
                Income
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
});

const BudgetSummary = connect(
  mapState,
  null
)(BudgetSummaryComp);

export default withStyles(styles)(BudgetSummary);
