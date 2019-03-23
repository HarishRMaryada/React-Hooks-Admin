import React from "react";
import { Field } from "redux-form";

//material ui
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

//custom styles
import styles from "../partners.styles";

//inputs
import TextField from "../../../Common/Inputs/TextField";

function PersonalForm(props) {
  const { classes } = props;
  let content = (
    <Paper className={classes.formRootPaper}>
      <div className={classes.heading}>
        <h3>Basic Info</h3>
      </div>

      <div>
        {false && <Field name="user._id" component={TextField} />}
        <Field
          className={classes.textBase}
          name="user.name"
          component={TextField}
          label="Name"
        />
        <Field
          className={classes.textBase}
          name="user.email"
          component={TextField}
          label="User Email"
        />

        <Field
          className={classes.textBase}
          name="user.phone"
          component={TextField}
          label="Phone"
        />
        <Field
          className={classes.textBase}
          name="user.alternatePhone"
          component={TextField}
          label="Alternate Phone"
        />
        <Field
          className={classes.textBase}
          name="user.address.line1"
          component={TextField}
          label="Street"
        />
        <Field
          className={classes.textBase}
          name="user.address.line2"
          component={TextField}
          label="Area"
        />
        <Field
          className={classes.textBase}
          name="user.address.city"
          component={TextField}
          label="City"
        />
        <Field
          className={classes.textBase}
          name="user.address.state"
          component={TextField}
          label="State"
        />
        <Field
          className={classes.textBase}
          name="user.address.pincode"
          component={TextField}
          label="Pincode"
        />
      </div>
    </Paper>
  );
  return content;
}
export default withStyles(styles)(PersonalForm);
