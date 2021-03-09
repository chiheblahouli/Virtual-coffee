import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import PowerSettingsNewOutlinedIcon from "@material-ui/icons/PowerSettingsNewOutlined";

//import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import "./coffee.css";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Coffee1 from "./theGateMap";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import useCoffee from "./hooks/coffee_hooks/useCoffee";
import useUserQuery from "./hooks/auth_hooks/useUser";
import { useMutation, queryCache } from "react-query";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function logout() {
  localStorage.removeItem("token");
  queryCache.removeQueries("user");
}
export default function ButtonAppBar() {
  const classes = useStyles();
  let history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { pathname } = useLocation();
  console.log(pathname);
  const { data } = useUserQuery();
  const [logoutMutation] = useMutation(logout, {
    onSuccess: () => {
      queryCache.invalidateQueries("user");
      history.push("/login");
    },
  });
  useEffect(() => {
    if (!localStorage.token) {
      // queryCache.setQueryData("token", localStorage.token);
      history.push("/login");
    }
    // Update the document title using the browser API
  }, []);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  let Coffee = useCoffee("604117f206be3e18ad24f3c8");

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <LocalCafeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Virtual Coffee | {Coffee?.data?.name}
          </Typography>
          <div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <Avatar src={"/icons/" + data?.data?.name + ".jpg"}></Avatar>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>{data && data.data.name} </MenuItem>
              <MenuItem
                onClick={() => {
                  logoutMutation();
                }}
              >
                <PowerSettingsNewOutlinedIcon /> Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Coffee1 />{" "}
    </div>
  );
}
