import React, { Fragment, useState, useEffect, useRef } from "react";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Users from "./utils/usersList";
import Button from "@material-ui/core/Button";
import PowerSettingsNewOutlinedIcon from "@material-ui/icons/PowerSettingsNewOutlined";
import { useHistory, useLocation } from "react-router-dom";
import useCoffee from "./hooks/coffee_hooks/useCoffee";
import emoji from "react-easy-emoji";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import "./chat.css";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { green } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import useUserQuery from "./hooks/auth_hooks/useUser";
import { useMutation, queryCache } from "react-query";
import TextField from "@material-ui/core/TextField";
import TelegramIcon from "@material-ui/icons/Telegram";
import { blue } from "@material-ui/core/colors";
import useAddUser from "./hooks/coffee_hooks/useAddUser";
import useRemoveUser from "./hooks/coffee_hooks/useRemoveUser";

import io from "socket.io-client";

const drawerWidth = 240;
let socket;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  roott: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  tabRoot: {
    minWidth: 10,
  },
  test: {
    all: "none",
  },
  roots: {
    position: "relative",
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
    zIndex: "1",
  },
  inline: {
    display: "inline",
  },
  bott: {
    width: "100%",

    backgroundColor: theme.palette.background.paper,
    zIndex: "1",
  },

  field: {
    minwidth: "100%",
    maxWidth: "100%",
    position: "absolute",
    bootom: "0px",
    marginBottom: "2%",
    zIndex: "3",
  },
}));

function logout() {
  localStorage.removeItem("token");
  queryCache.removeQueries("user");
}

export default function PersistentDrawerRight() {
  //*********************************** */
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const scrollRef = useRef(null);
  //*********************************** */
  const classes = useStyles();
  let history = useHistory();
  const theme = useTheme();
  const location = useLocation();
  let cof = location.pathname.substring(1, location.pathname.indexOf("/", 2));
  let table = location.pathname.substring(
    location.pathname.indexOf("/", 2) + 1,
    location.pathname.length
  );
  const [mutate] = useAddUser("add", cof, table);
  const [mutate1] = useRemoveUser("remove", cof, table);
  //console.log(cof);
  // console.log(table);
  let Coffee = useCoffee(cof);

  const [open, setOpen] = React.useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const { data } = useUserQuery();
  const [logoutMutation] = useMutation(logout, {
    onSuccess: () => {
      queryCache.invalidateQueries("user");
      history.push("/login");
    },
  });
  /*************************************************************/
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);
  useEffect(() => {
    const room = table;
    const username = data && data.data.name;
    socket = io("http://localhost:5000", {
      transports: ["websocket", "polling", "flashsocket"],
    });
    window.onunload = window.onbeforeunload = function () {
      socket.close();
    };
    //room && getChat(room);

    username && socket.emit("joinRoom", { username, room });

    socket.on("message", (message) => {
      console.log(message);
      messages && setMessages((messages) => [...messages, message]);
    });
    socket.on("roomUsers", ({ room, users }) => {
      setUsers(users);
      console.log(users);
    });
    return async () => {
      await mutate1("remove", cof, table);
      socket.close();
    };
  }, [location.pathname]);
  const onChange = (e) => {
    e.preventDefault();
    setMsg(e.target.value);
  };
  const onClick = (e) => {
    e.preventDefault();

    //emit message to the server
    socket.emit("chatMessage", msg);
    // addMessage()
    //Clear input
    setMsg("");
  };
  /**************************************************************/
  useEffect(async () => {
    if (!localStorage.token) {
      // queryCache.setQueryData("token", localStorage.token);
      history.push("/login");
    }
    await mutate("add", cof, table);
    return async () => {
      socket.close();
      await mutate1("remove", cof, table);
    };
    // Update the document title using the browser API
  }, []);
  const userss = Array.from(new Set(users.map((a) => a.id))).map((id) => {
    return users.find((a) => a.id === id);
  });
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <LocalCafeIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            {Coffee?.data?.name} | {table}
          </Typography>
          <div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <Avatar>{data && data.data.name[0]}</Avatar>
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
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div id="container">
          <main>
            <header>
              {/* <Avatar>T</Avatar> */}

              <div>
                <h1> {table}</h1>
              </div>
            </header>
            <ul id="chat">
              {messages &&
                messages.map((msg) => (
                  <li
                    className={
                      data && data.data.name === msg.username ? "me" : "you"
                    }
                  >
                    <div className="entete">
                      <span
                        className={
                          data && data.data.name === msg.username
                            ? "status blue"
                            : "status green"
                        }
                      />
                      <h2>
                        {data && data.data.name === msg.username
                          ? "me"
                          : msg.username}
                      </h2>
                      <br />
                      <h3>{msg.time}</h3>
                    </div>
                    <div className="message">{emoji(msg.text)}</div>
                    <li key="1" ref={scrollRef} />
                  </li>
                ))}
            </ul>
          </main>{" "}
        </div>{" "}
        <footer>
          {" "}
          <TextField
            style={{ width: "90%" }}
            id="msg"
            label="Message"
            placeholder="write your message"
            multiline
            edge="start"
            variant="outlined"
            rowsMax={1}
            value={msg}
            onChange={(e) => onChange(e)}
            onKeyPress={(e) => (e.key === "Enter" ? onClick(e) : null)}
          />
          &nbsp;&nbsp;&nbsp;
          <IconButton onClick={(e) => onClick(e)} aria-label="delete">
            <TelegramIcon style={{ color: blue[500] }} edge="end" />
          </IconButton>
        </footer>{" "}
      </main>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <List dense className={classes.roott}>
          {userss &&
            userss.map((user) => (
              <ListItem key={user.username}>
                <ListItemAvatar>
                  <Avatar alt={user.username} src="./sfqf" />
                </ListItemAvatar>
                <ListItemText id={user.username} primary={user.username} />
                <ListItemSecondaryAction>
                  <CheckCircleOutlineIcon
                    edge="end"
                    style={{ color: green[500] }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          <Divider />
        </List>
      </Drawer>
    </div>
  );
}
