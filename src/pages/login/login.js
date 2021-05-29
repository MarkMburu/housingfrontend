import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { ActionCreators } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import LinearIndeterminate from "../../components/LinearIndeterminate";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Equity Premier Land Solution
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const initialState = {
  username: "",
  password: "",
  branch: "",
  submitted: false,
};
export default function SignInSide(props) {
  const classes = useStyles();
  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const login = useSelector((state) => state.users.users);
  console.log("login user", login);

  const handleChange = (event) => {
    const name = event.target.name;
    setUser({
      ...user,
      [name]: event.target.value,
    });
  };
  // useEffect(() =>
  //  {

  //  }, [login]);

  const submitForm = (event) => {
    event.preventDefault();
    setLoading(true);
    setUser({ ...user, submitted: true });
    console.log("user", user);
    dispatch(ActionCreators.login(user));
      setLoading(false);
      props.setIsLoggedIn(true)
  
  };

  return (
    <>
      {loading ? (
        <LinearIndeterminate />
      ) : (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={6} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={6}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log In
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Username"
                  name="username"
                  autoComplete="email"
                  autoFocus
                  required
                  value={user.username}
                  onChange={handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={submitForm}
                >
                  Log In
                </Button>

                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
}
