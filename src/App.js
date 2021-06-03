import SignInSide from "./pages/login/login";
import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles, ThemeProvider, createMuiTheme } from "@material-ui/core";
import PermanentDrawerLeft from "./components/Drawer";
import Dashboard from "./pages/Dashboard"
import Registration from "./pages/Registration/Registration";
import MemberList from "./pages/Registration/pesronalInformation/MemberList";
import ProjectList from "./pages/Projects/ProjectsList";
import ProjectDetails from "./pages/Projects/ProjectDetails";
import Sale from "./pages/Sales";
import Receipt from "./pages/Receipts";
import HousingList from "./pages/Housing/HousingList";
import HousingDetails from "./pages/Housing/HousingDetails";
import HousingSale from "./pages/HousingSales"
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  content: {
    width: "100%",
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
    margin: theme.spacing(3),
  },
}));
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
    shape: {
      borderRadius: "12px",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});
function App() {
  const classess = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <ThemeProvider theme={theme}>
        {isLoggedIn ? (
          <div className={classess.container}>
            <Router>
              <PermanentDrawerLeft />
              <Switch>
                <div className={classess.content}>
                  <Route path="/" component={Dashboard} exact />
                  <Route path="/members" component={MemberList} exact/>
                  <Route path="/members/:id" component={Registration} exact/>
                  <Route path="/projects" component={ProjectList} exact/>
                  <Route path="/projects/:id" component={ProjectDetails} exact />
                  <Route path="/transactions" component={Receipt} exact/>
                  <Route path="/sales" component={Sale} exact/>
                  <Route path="/housing" component={HousingList} exact/>
                  <Route path="/housing/:id" component={HousingDetails} exact/>
                  <Route path="/housingsales" component={HousingSale} exact />
                </div>
              </Switch>
            </Router>
          </div>
        ) : (
          <SignInSide isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
