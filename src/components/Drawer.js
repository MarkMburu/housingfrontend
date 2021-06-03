import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme, Grid, Badge } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import GroupIcon from "@material-ui/icons/Group";
import { withRouter } from "react-router-dom";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ChatIcon from "@material-ui/icons/Chat";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import TextureIcon from "@material-ui/icons/Texture";
import PersonIcon from "@material-ui/icons/Person";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import PeopleIcon from "@material-ui/icons/People";
import AssessmentIcon from "@material-ui/icons/Assessment";
import HomeIcon from "@material-ui/icons/Home";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerColor: {
    background: "#fff",
    color: "#000",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  paper: {
    background: "black",

    color: "white",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  drawerPaper: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    color:"#fff",
    fontWeight:"bold"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    minHeight: "20px",
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
function PermanentDrawerLeft(props) {
  const { history } = props;
  console.log(props);
  const classes = useStyles();
  const itemList = [
    {
      text: "Dashboard",
      icon: <HomeIcon color='primary' fontSize='large'/>,
      onClick: () => history.push("/"),
    },
    {
      text: "Members",
      icon: <GroupAddIcon color='primary' fontSize='large'/>,
      onClick: () => history.push("/members"),
    },
    {
      text: "Transactions(Receipts)",
      icon: <ReceiptIcon color='primary' fontSize='large'/>,
      onClick: () => history.push("/transactions"),
    },
    {
      text: "Lands",
      icon: <GroupIcon color='primary' fontSize='large'/>,
      onClick: () => history.push("/projects"),
    },
    {
      text: "Lands Sales",
      icon: <ReceiptIcon color='primary' fontSize='large'/>,
      onClick: () => history.push("/sales"),
    },
    {
      text: "Housing",
      icon: <AccountBalanceIcon color='primary' fontSize='large'/>,
      onClick: () => history.push("/housing"),
    },
    {
      text: "Housing Sales",
      icon: <PeopleIcon color='primary' fontSize='large'/>,
      onClick: () => history.push("/housingsales"),
    },
  ];
  const itemList2 = [
    {
      text: "Agents Profile",
      icon: <PersonIcon color='primary' fontSize='large'/>,
      onClick: () => history.push("/agents"),
    },

    {
      text: "Customer Statements",
      icon: <AssessmentIcon color='primary' fontSize='large'/>,
      onClick: () => history.push("/reports"),
    },
    {
      text: "Project Report",
      icon: <AssessmentIcon color='primary' fontSize='large'/>,
      onClick: () => history.push("/reports"),
    },
    {
      text: "Sales report",
      icon: <AssessmentIcon color='primary' fontSize='large'/>,
      onClick: () => history.push("/reports"),
    },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={(classes.appBar, classes.drawerColor)}
      >
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item sm></Grid>
            <Grid item>
              <IconButton>
                <Badge badgeContent={4} color="secondary">
                  <NotificationsNoneIcon fontSize="small" />
                </Badge>
              </IconButton>
              <IconButton>
                <Badge badgeContent={3} color="primary">
                  <ChatIcon />
                </Badge>
              </IconButton>

              <IconButton>
                <PowerSettingsNewIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Typography variant="h6" style={{ paddingTop: "12px" }}>
          Equity Management System
        </Typography>
        <div className={classes.toolbar} />

        <Divider />
        <List>
          {itemList.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItem button key={text} onClick={onClick}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <List>
          {itemList2.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItem button key={text} onClick={onClick}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
}
export default withRouter(PermanentDrawerLeft);
