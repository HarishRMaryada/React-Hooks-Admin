import React from "react";
import { Field } from "redux-form";

//material ui
import { withStyles } from "@material-ui/core/styles";
import { GridList, Typography } from "@material-ui/core";

import styles from "../partners.styles";

import { productTermsandConditions } from "../../../Common/Data/terms";

function Confirm(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.heading}>
        <h3>Terms and Conditions</h3>
      </div>
      <div>
        <div className={classes.gridRoot}>
          <GridList cellHeight={250} className={classes.gridList} cols={1}>
            <Typography>{productTermsandConditions}</Typography>
          </GridList>
        </div>
        <Field
          name={`acceptedTandC`}
          label="Checked"
          type="checkbox"
          component="input"
          style={{ border: "solid" }}
        />

        <label style={{ fontWeight: "bold" }}>
          I/We agree to the Terms and Conditions
        </label>
      </div>
    </div>
  );
}

export default withStyles(styles)(Confirm);
