import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import FastForwardIcon from "@material-ui/icons/FastForward";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import AllOutIcon from "@material-ui/icons/AllOut";
import AvTimerIcon from "@material-ui/icons/AvTimer";
//import Link from "../components/common/Link";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 250,
  },
  media: {
    height: 140,
  },
});

export default function BusinessCard({
  store: { id, name, currentNumber, image, status, TNbr },
  auth,
}) {
  const classes = useStyles();

  return (
    <Grid item>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={image} title="banque" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <LocalCafeIcon style={{ fontSize: 15 }} /> peoples number:{" "}
              {currentNumber}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <AllOutIcon style={{ fontSize: 15 }} /> Tables number: {TNbr}
            </Typography>{" "}
            <Typography variant="body2" color="textSecondary" component="p">
              <AvTimerIcon style={{ fontSize: 15 }} /> status: {status}
            </Typography>{" "}
          </CardContent>
        </CardActionArea>
        <CardActions>
          {auth != "yes" ? (
            <Button
              size="small"
              color="primary"
              // component={Link}
              naked
              href={"/" + name}
            >
              Enter
            </Button>
          ) : (
            ""
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
