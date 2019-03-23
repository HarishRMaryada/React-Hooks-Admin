import React from "react";
import { Field } from "redux-form";

//material ui
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import styles from "../../products.styles";

import TextField from "../../../../Common/Inputs/TextField";

function DeliveryManagement(props) {
  const getDeliveryContent = showContent => {
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
  let deliveryContent = (
    <Paper className={classes.formRootPaper}>
      <div className={classes.heading}>
        <h3>Delivery Management</h3>
      </div>
      {getDeliveryContent(props.customContent)}
    </Paper>
  );
  return deliveryContent;
}

const getVehicles = classes => {
  return (
    <div className={classes.root}>
      <Field
        className={classes.textBase}
        name="weight"
        component={TextField}
        label="Weight"
      />
      <Field
        className={classes.textBase}
        name="dimensions"
        component={TextField}
        label="Dimensions"
      />
    </div>
  );
};

let DeliveryMgmtForm = DeliveryManagement;
export default withStyles(styles)(DeliveryMgmtForm);
