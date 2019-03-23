import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Field, reduxForm } from "redux-form";

//material ui styles
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Button, Paper } from "@material-ui/core";

//custom styles
import styles from "../organizations.styles";

//data
import states from "../../../Common/Data/states.json";

//actions
import * as EnquiryActions from "../redux/enquires.actions";

//redux-form inputs
import TextField from "../../../Common/Inputs/TextField";
import SelectField from "../../../Common/Inputs/SelectField";

function EnquiryForm(props) {
  // states.forEach(state => {
  //     console.log(state)
  // });
  //hooks
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (props.type === "edit" && props.id) {
      props.getEnquiry(props.id);
    }
  }, []);

  const onEnquirySubmit = values => {
    if (values._id) {
      props.updateEnquiry(values._id, values, (err, result) => {
        if (result) {
          setRedirect(true);
        }
        // if (result) {
        //   this.setState({ error: null, success: true });
        // } else {
        //   this.setState({ error: "Update Failed" });
        // }
      });
    }
  };

  const Form = () => {
    return (
      <Paper className={classes.formRootPaper} elevation={1}>
        <form onSubmit={handleSubmit(onEnquirySubmit)}>
          <Field
            className={classes.textBase}
            name="contactName"
            component={TextField}
            label="Name"
          />

          <Field
            className={classes.textBase}
            name="contactEmail"
            component={TextField}
            label="Email"
          />

          <Field
            className={classes.textBase}
            name="contactPhone"
            component={TextField}
            label="Phone"
          />

          <Field
            className={classes.textBase}
            name="companyName"
            component={TextField}
            label="Company Name"
          />

          <Field
            className={classes.textBase}
            name="companyWebsite"
            component={TextField}
            label="Website"
          />

          <Field
            className={classes.textBase}
            name="companyCity"
            component={TextField}
            label="City"
          />

          <Field
            className={classNames(classes.textBase, classes.selectBase)}
            name="companyState"
            component={SelectField}
            label="State"
          >
            {states.map(state => (
              <option value={state} key={state}>
                {state}
              </option>
            ))}
          </Field>

          <Button
            type="submit"
            className={classNames(classes.btn, classes.btnPrimary)}
          >
            Save
          </Button>
        </form>
      </Paper>
    );
  };

  const { classes, handleSubmit } = props;

  if (redirect) {
    return <Redirect to="/organizations/enquirylist" />;
  }
  return <Form />;
}

const mapStateToProps = state => ({
  initialValues: state.enquiries.details.data,
  enquiries: state.enquiries
});

const mapDispatchToProps = {
  getEnquiry: EnquiryActions.getEnquiry,
  updateEnquiry: EnquiryActions.updateEnquiry
};

let EnquiryReduxForm = reduxForm({
  form: "EnquiryForm"
  // validate
})(EnquiryForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EnquiryReduxForm));
