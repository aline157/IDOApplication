import React, { Fragment } from "react";
//import Banner from "react-js-banner";
import { Paper, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles(theme => ({
  button: {
    margin: 10,
    height: 25,
    background: "rgb(120, 169, 230)",
    border: "1px solid rgb(58, 148, 207)"
  },
  typo: {
    marginTop: 2,
    marginLeft: 10,
    background: "inherit",
    flexGrow: 1
  },
  success: {
    height: 35,
    margin: -7,
    display: "flex",
    border: "1px solid green",
    background: "lightgreen",
      content: "Success",   
    marginTop: "30" 
  },
  error: {
    height: 35,
    margin: -7,
    display: "flex",
    flexGrow: 1,
    border: "1px solid red",
    background: "rgb(253, 148, 165)",
      content: "failure",
      marginTop: ""
  }
}));

export default (props) => {
  const [show, hide] = React.useState(true);
  const [success, change] = React.useState(null);
  const classes = useStyle();
  const Switch = () => change(!success);
  const Dismiss = () => {
      hide(!show);
      props.onChange()
      
  };
  return (
    <Fragment>
      {show ? (
        <Paper
          className={success ? classes.success : classes.error}
          square
          elevation={0}
        >
          <Typography className={classes.typo}>Everything that can go wrong will go wrong!</Typography>
          <Button
            onClick={Dismiss}
            style={{ borderRadius: "50%", height: 25, width: 25 }}
          >
            x
          </Button>
        </Paper>
      ) : null}
      
      </Fragment>
      
      
  );
};