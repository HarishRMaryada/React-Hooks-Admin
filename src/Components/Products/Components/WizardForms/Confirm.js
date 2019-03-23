import React from "react";
import { Field } from "redux-form";

//material ui
import { withStyles } from "@material-ui/core/styles";
import { Paper,GridList ,Typography} from "@material-ui/core";

import styles from '../../products.styles'

//inputs
import TextField from "../../../../Common/Inputs/TextField";

import { productTermsandConditions } from "../../../../Common/Data/terms";

function Confirm(props) {
  const getTermsContent = showContent => {
    switch (showContent) {
      case 0:
        // return <GetVehicles classes={classes}/>
        return getVehicles(classes);
      case 1:
        return <h1>Ev Component under Progresss</h1>;
      case 2:
        return <h1>Service under Progress</h1>;
      case 3:
        return <h1>under Progress</h1>;
      case 4:
        return <div>under Progress</div>;
      default:
        return "Work under Progress";
    }
  };
  const { classes } = props;
  let confirmContent = (
    <Paper className={classes.formRootPaper}>
      <div className={classes.heading}>
        <h3>Price Management</h3>
      </div>
      {getTermsContent(props.customContent)}
    </Paper>
  );
  return confirmContent;
}

const getVehicles = classes => {
  return (
    <div className={classes.root}>
      Terms and Conditions
      <div>
        <div>
          <Field
            className={classes.base}
            name="brochureUrl"
            component={TextField}
            label="Brochure Link"
          />
        </div>
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
};


export default withStyles(styles)(Confirm);
