import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import SimpleLineChart from './SimpleLineChart'
import SimpleTable from './SimpleTable'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import axios from 'axios'

require('dotenv').config()

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },

  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto'
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  }
})

class Dashboard extends React.Component {
  state = {
    open: true,
    hour: [],
    day: [],
    week: [],
    month: [],
    all: [],
    isOn: true
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }
  toggleOnOff = async e => {
    if (this.state.isOn) {
      await axios.get('http://localhost:3003/turnoff')
      this.setState({ isOn: !this.state.isOn })
    } else {
      await axios.get('http://localhost:3003/turnon')
      this.setState({ isOn: !this.state.isOn })
    }
  }
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Little Feet Dashboard
            </Typography>
            <IconButton color="inherit">
              <FormControlLabel
                control={<Switch value="checkedB" color="secondary" disableTouchRipple disableRipple />}
                onChange={this.toggleOnOff}
                label="On/Off"
              />
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            Graph
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <SimpleLineChart />
          </Typography>
          <Typography variant="h4" gutterBottom component="h2">
            Statistic
          </Typography>
          <div className={classes.tableContainer}>
            <SimpleTable data={this.state} />
          </div>
        </main>
      </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Dashboard)
