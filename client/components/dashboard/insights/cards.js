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
    marginRight: '25px',
    marginLeft: '25px',
    marginBottom: '25px',
    flexGrow: 1,
    padding: '25px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    backgroundColor: 'white',
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    height: 45,
    backgroundColor: 'white',
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    justifyContent: 'center',
  },
  textCard: {
    fontSize: '1.5rem',
    color: 'rgb(92, 92, 92)',
  },
  cardHead: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'rgb(92, 92, 92)',
  },
  bottom: {
    backgroundColor: 'rgb(214, 214, 214)',
    color: 'white',
  },
  buttons: {
    color: 'black',
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
        <Paper square elevation={0} className={classes.top}>
          <Typography className={classes.cardHead}>
            Insights from the last 30 days
          </Typography>
        </Paper>
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
