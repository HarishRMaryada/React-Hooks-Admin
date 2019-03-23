import React from "react";
import { Link } from "react-router-dom";

//material-ui
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Typography } from "@material-ui/core";
import RightArrow from "@material-ui/icons/KeyboardArrowRight";

const styles = theme => ({
  typographyStyling: {
    backgroundColor: theme.local.greylight,
    color: theme.palette.reactPrimary
  },
  typographySpacing: {
    margin: theme.spacing.unit
  },
  rightArrow: {
    marginTop: theme.spacing.unit
  },
  linksColor: {
    color: theme.palette.reactSecondary,
    "&:hover": {
      color: theme.palette.reactSecondary
    }
  }
});

function BreadCrum(props) {
  const { classes, breadCrum } = props;
  let path = breadCrum.split("/");
  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Typography
      className={classNames(
        classes.typographyStyling,
        classes.typographySpacing
      )}
      variant="body1"
      component="h6"
    >
      <Link to={props.baseUrl + path[1]} className={classes.linksColor}>
        {path[1] ? capitalizeFirstLetter(path[1]) : ""}
      </Link>
      {path[2] ? <RightArrow className={classes.rightArrow} /> : ""}
      <Link
        to={`${props.baseUrl}${path[1]}/${path[2]}/`}
        className={classes.linksColor}
      >
        {path[2] ? capitalizeFirstLetter(path[2]) : ""}
      </Link>

      {/* {path[3] ? <RightArrow /> : ""} */}
    </Typography>
  );
}

export default withStyles(styles)(BreadCrum);
