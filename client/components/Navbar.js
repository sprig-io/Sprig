import React from "react";
import { logoutUser } from "../store/userReducer";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Assessment from "@material-ui/icons/Assessment";
import TimelineIcon from "@material-ui/icons/Timeline";
import Dashboard from "@material-ui/icons/Dashboard";
import classNames from "classnames";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { Link } from "react-router-dom";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import "./dashboard/Summary.css";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;
    let welcome = this.props.user.name;
    return (
      <div id="navbar" className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
          style={{ backgroundColor: "#4c9f70" }}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/dashboard" onClick={this.handleDrawerClose}>
              <img
                src="/navBarLogo.png"
                height="40"
                style={{ marginTop: "9px" }}
              />
            </Link>
            <h6 id="welcome">Hello, {welcome}</h6>
            <a id="logouts" onClick={this.onLogoutClick}>
              Logout
            </a>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link to="/dashboard" style={{ color: "black" }}>
              <ListItem button onClick={this.handleDrawerClose}>
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>
            <Link to="/about" style={{ color: "black" }}>
              <ListItem button onClick={this.handleDrawerClose}>
                <ListItemIcon>
                  <ChromeReaderModeIcon />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItem>
            </Link>
            <Link to="/budget" style={{ color: "black" }}>
              <ListItem button onClick={this.handleDrawerClose}>
                <ListItemIcon>
                  <Assessment />
                </ListItemIcon>
                <ListItemText primary="Budget" />
              </ListItem>
            </Link>
            <Link to="/insights" style={{ color: "black" }}>
              <ListItem button onClick={this.handleDrawerClose}>
                <ListItemIcon>
                  <TimelineIcon />
                </ListItemIcon>
                <ListItemText primary="Insights" />
              </ListItem>
            </Link>
            <ListItem button onClick={this.onLogoutClick}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
          <Divider />
        </Drawer>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.userReducer.user
});
const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Navbar));
