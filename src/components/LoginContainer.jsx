import React, { useState } from "react";
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
import { Route, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import userState from "../recoil/userState";
import loggedInState from '../recoil/login'
import GitHubIcon from '@material-ui/icons/GitHub'
import Toolbar from "@material-ui/core/Toolbar";


function Copyright() {
  return (
    <div>
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/jacobkagon" target="_blank">
      <GitHubIcon fontSize='small' GitHubIcon/> Jacob 
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
    <a href="https://www.themoviedb.org/" target="_blank" color='inherit'>
    <Typography variant="body2" color="textSecondary" align="center">API courtesy of TMDB</Typography>
    </a>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fG1vdmllfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60)",
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
  toolbarTitle: {
    flex: 1,
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

export default function SignInSide({handleUser}) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [stateUser, setUser] = useRecoilState(userState);
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("https://cinematic-backend.herokuapp.com/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        let newData = data
        localStorage.setItem("token", newData.jwt);
        if (data.user !== undefined) {
          setUser([...stateUser, data.user])
          handleUser(newData.user);
          setLoggedIn(true)
          history.push("/home");
          window.location.reload()
        } else {
          alert("Incorrect credentials")
        }
      }
      );
    setUsername("");
    setPassword("");
  };

  return (
    <div>
    <Toolbar className={classes.toolbar}><Typography
          component="h1"
          variant="h3"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          filmify
        </Typography></Toolbar>
    <Grid container component="main" className={classes.root}>
    {console.log(stateUser)}
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => handleSubmit(e)}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(event) => setUsername(event.target.value)}
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
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
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
               
              </Grid>
              <Grid item container>
                <Link href="/signup" variant="body2" color='inherit'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
       
      </Grid>
     
    </Grid>
    </div>
  );
}
