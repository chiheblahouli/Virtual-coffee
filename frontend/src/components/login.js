import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import React, { useState, useEffect } from "react";

import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import useLogin from "./hooks/auth_hooks/useLogin";
import { isError } from "react-query";
//import { useMutation, useQuery, useQueryCache, queryCache } from "react-query";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000/">
        Virtual Coffee Made by Med Chiheb LAHOULI
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
    backgroundImage: "url(https://source.unsplash.com/collection/1266517)",
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

export default function SignInSide() {
  const classes = useStyles();
  let history = useHistory();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  // const user = useUser();
  const [mutate, { status, data, error, isError }] = useLogin(
    email.toLowerCase(),
    password
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    //  console.log("click");

    await mutate(email, password);

    // data && localStorage.setItem("token", data.data.token);
    localStorage.token && history.push("/dashboard");
    console.log(status);
  };
  useEffect(() => {
    // Update the document title using the browser API
    if (localStorage.token) {
      // queryCache.setQueryData("token", localStorage.token);
      history.push("/dashboard");
    }
  }, []);

  return (
    <React.Fragment>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {" "}
          <div className={classes.paper}>
            {" "}
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form
              className={classes.form}
              onSubmit={(e) => onSubmit(e)}
              noValidate
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                value={password}
                onChange={(e) => onChange(e)}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
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
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                component={Link}
                naked
                href={"http://localhost:3000/"}
              >
                return
              </Button>
            </form>
            <br />
            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
