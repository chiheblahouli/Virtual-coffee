import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Medialoading from "./loading/mediaCards";
import Avatar from "@material-ui/core/Avatar";
import PowerSettingsNewOutlinedIcon from "@material-ui/icons/PowerSettingsNewOutlined";

import Card from "./card";
import Grid from "@material-ui/core/Grid";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import useAllCoffees from "./hooks/coffee_hooks/useAllCoffees";
import { useMutation, queryCache } from "react-query";
import useUserQuery from "./hooks/auth_hooks/useUser";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
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
  const allCoffeesQuery = useAllCoffees();
  const { data } = useUserQuery();
  let history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [logoutMutation] = useMutation(logout, {
    onSuccess: () => {
      queryCache.invalidateQueries("user");
      history.push("/login");
    },
  });
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (!localStorage.token) {
      // queryCache.setQueryData("token", localStorage.token);
      history.push("/login");
    }
    // Update the document title using the browser API
  }, []);
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
            Virtual Coffee
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
      <br />
      <br />
      <br />
      <Grid
        className={classes.container}
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        {allCoffeesQuery.isLoading ? (
          <React.Fragment>
            <Medialoading />
            <Medialoading />
            <Medialoading />
          </React.Fragment>
        ) : allCoffeesQuery.isError ? (
          allCoffeesQuery.error.message
        ) : (
          allCoffeesQuery.data.map((coffee) => {
            let nbrTCU = 0;
            let nbrTAU = 0;
            let nbrTET = 0;
            for (let table in coffee.tables) {
              // console.log(coffee.tables[table]);
              nbrTCU += coffee.tables[table]?.users?.length;
              nbrTAU += coffee.tables[table]?.limitNumber;
              if (coffee.tables[table]?.users?.length === 0) nbrTET += 1;
            }
            let nbrTT = coffee.tables.length - nbrTET;
            return (
              <Card
                key={coffee._id}
                store={{
                  id: coffee._id,
                  name: coffee.name,
                  image: "/" + coffee.name + ".jpg",
                  status: "open",
                  TNbr: nbrTT + "/" + coffee.tables.length,
                  currentNumber: nbrTCU + "/" + nbrTAU,
                }}
                auth={"no"}
              />
            );
          })
        )}
      </Grid>
      );
      {/* <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        {" "}
        <Card
          store={{
            id: "1",
            name: "The gate",
            image: "/thegate.jpg",
            status: "open",
            currentNumber: "36",
            TNbr: 5,
          }}
        />
        <Card
          store={{
            id: "1",
            name: "Cosmitto coffee",
            image: "/cosmitto.jpg",
            status: "open",
            currentNumber: "36",
            TNbr: 5,
          }}
        />{" "}
        <Card
          store={{
            id: "1",
            name: "Big dip",
            image: "/bigdeep.jpg",
            status: "open",
            currentNumber: "36",
            TNbr: 5,
          }}
        />
      </Grid>*/}
    </div>
  );
}
