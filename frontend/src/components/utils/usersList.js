import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { green } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CheckboxListSecondary() {
  const classes = useStyles();

  return (
    <List dense className={classes.root}>
      <ListItem key="houcem">
        <ListItemAvatar>
          <Avatar alt="Houcem" src="./sfqf" />
        </ListItemAvatar>
        <ListItemText id="Houcem" primary="Houcem Testouri" />
        <ListItemSecondaryAction>
          <CheckCircleOutlineIcon edge="end" style={{ color: green[500] }} />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
      <ListItem key="Firas">
        <ListItemAvatar>
          <Avatar alt="Firas" src="./sfqf" />
        </ListItemAvatar>
        <ListItemText id="Firas" primary="Firas khlil" />
        <ListItemSecondaryAction>
          <CheckCircleOutlineIcon edge="end" style={{ color: green[500] }} />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
      <ListItem key="Ramzi">
        <ListItemAvatar>
          <Avatar alt="Ramzi" src="./sfqf" />
        </ListItemAvatar>
        <ListItemText id="Ramzi" primary="Ramzi Zelfani" />
        <ListItemSecondaryAction>
          <CheckCircleOutlineIcon edge="end" style={{ color: green[500] }} />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
      <ListItem key="Abdallah">
        <ListItemAvatar>
          <Avatar alt="Abdallah" src="./sfqf" />
        </ListItemAvatar>
        <ListItemText id="Abdallah" primary="Abdallah Bekir" />
        <ListItemSecondaryAction>
          <CheckCircleOutlineIcon edge="end" style={{ color: green[500] }} />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
      <ListItem key="Ichraf">
        <ListItemAvatar>
          <Avatar alt="Ichraf" src="./sfqf" />
        </ListItemAvatar>
        <ListItemText id="Ichraf" primary="Ichraf Lahouli" />
        <ListItemSecondaryAction>
          <CheckCircleOutlineIcon edge="end" style={{ color: green[500] }} />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
      <ListItem key="Riadh">
        <ListItemAvatar>
          <Avatar alt="Riadh" src="./sfqf" />
        </ListItemAvatar>
        <ListItemText id="Riadh" primary="Riadh Brinsi" />
        <ListItemSecondaryAction>
          <CheckCircleOutlineIcon edge="end" style={{ color: green[500] }} />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </List>
  );
}
