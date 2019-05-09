import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = theme => ({
  root: {
    maxWidth: 600,
    flexGrow: 1,
    padding: '25px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 250,
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: 'white',
  },
  textCard: {
    fontSize: '1.5rem',
    color: 'rgb(92, 92, 92)',
  },
  bottom: {
    backgroundColor: ' #4c9f70',
    color: 'white',
  },
  buttons: {
    color: 'white',
    fontWeight: 'bold',
  },
});

class SwipeableTextMobileStepper extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;
    const maxSteps = this.props.tutorialSteps.length;

    return (
      <div className={classes.root}>
        <h1>In the last 30 days...</h1>
        <Paper square elevation={0} className={classes.header}>
          <Typography className={classes.textCard}>
            {this.props.tutorialSteps[activeStep].label}
          </Typography>
        </Paper>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          className={classes.bottom}
          nextButton={
            <Button
              className={classes.buttons}
              size="small"
              onClick={this.handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              className={classes.buttons}
              size="small"
              onClick={this.handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </div>
    );
  }
}

SwipeableTextMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(
  SwipeableTextMobileStepper
);
