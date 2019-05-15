import React, { Component } from 'react';
import { addingBudget } from '../../store/budgetReducer';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Edit from '@material-ui/icons/edit';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  slider: {
    padding: '22px 0px',
    touchAction: 'none',
  },

  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    color: '#4c9f70',
  },
  input: {
    borderBottom: 'none',
  },
});

class BudgetComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: 0,
      open: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleSliderChange(event, value) {
    this.setState({ goal: Math.floor(value) });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.props.addingBudget(
      {
        userId: this.props.user.id,
        monthlyGoal: this.state.goal,
      },
      this.props.monthlyIncome
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="editor">
        <Edit onClick={this.handleClickOpen} />

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'How much would you like to save this month?'}
          </DialogTitle>
          <DialogContent>
            <div className="budgetForm">
              <form className={classes.root2} onSubmit={this.handleSubmit}>
                <div className="sliderContainer">
                  <div className={classes.root}>
                    <Slider
                      classes={{ container: classes.slider }}
                      value={this.state.goal}
                      aria-labelledby="label"
                      onChange={this.handleSliderChange}
                      min={0}
                      max={this.props.monthlyIncome}
                    />
                    <div className="buttonRow">
                      <div className="textDiv">
                        <TextField
                          disabled={true}
                          id="outlined-adornment-amount"
                          className={classes.margin}
                          className={classes.textField}
                          variant="outlined"
                          value={this.state.goal}
                          label="Savings Target"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                      <Button
                        className="buttonUpd"
                        type="submit"
                        variant="contained"
                        onClick={this.handleClose}
                      >
                        Update Goal
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapState = state => ({
  budget: state.budgetReducer.budget.monthylGoal,
  user: state.userReducer.user,
  monthlyIncome: state.accountReducer.monthlyIncome,
});

const mapDispatchToProps = dispatch => ({
  addingBudget: (budgetData, monthlyIncome) =>
    dispatch(addingBudget(budgetData, monthlyIncome)),
});

const SetBudget = connect(
  mapState,
  mapDispatchToProps
)(BudgetComp);
export default withStyles(styles)(SetBudget);
