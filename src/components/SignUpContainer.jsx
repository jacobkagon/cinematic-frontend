import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import userData from "../recoil/userState";
import loggedInState from "../recoil/login";
import { useRecoilState } from "recoil";
import GitHubIcon from "@material-ui/icons/GitHub";
import Toolbar from "@material-ui/core/Toolbar";

// import PropTypes from 'prop-types';
// import axios from 'axios';
// import { createUser } from '../redux/actions/authAction';

function Copyright() {
  return (
    <div>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link
          color="inherit"
          href="https://github.com/jacobkagon"
          target="_blank"
        >
          <GitHubIcon fontSize="small" /> Jacob
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <a href="https://www.themoviedb.org/" target="_blank" color="inherit">
        <Typography variant="body2" color="textSecondary" align="center">
          API courtesy of TMDB and 
        </Typography>
      </a>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
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

export default function SignUp({ handleUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [stateUser, setUser] = useRecoilState(userData);
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);

  const history = useHistory();

  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("https://cinematic-backend.herokuapp.com/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          first_name: firstName,
          last_name: lastName,
          username,
          email,
          password,
        },
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.errors) throw data.errors;
        else return data;
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.jwt);

        if (data.user) {
          setUser(data.user);
          setLoggedIn(true);
          handleUser(data.user);
          history.push("/");
          window.location.reload();
        } else {
          alert("Please fill in empty fields or choose unique username");
        }
      })
      .catch((errors) => {
        setErrors(errors);
        console.error(errors);
      });
  };

  return (
    <div>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h1"
          variant="h3"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          Cinematic
        </Typography>
      </Toolbar>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => handleSubmit(e)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item container>
                <Link href="/login" variant="body2" color="textSecondary">
                  Already have an account? Sign in
                </Link>
              </Grid>
              <a href="https://www.themoviedb.org/" target="_blank">
                <img
                  align="right"
                  width="40"
                  src="https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg"
                />
              </a>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
