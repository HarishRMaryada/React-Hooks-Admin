import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

//material ui styles
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Button, Paper, Typography } from "@material-ui/core";

//custom styles
import styles from "../organizations.styles";

//actions
import * as OrgActions from "../redux/organizations.actions";

//redux-form inputs
import TextField from "../../../Common/Inputs/TextField";
import SelectField from "../../../Common/Inputs/SelectField";

function OrganizationForm(props) {
  useEffect(() => {
    if (props.type === "edit" && props.id) {
      props.getOrganization(props.id);
    }
  }, []);

  const onOrganizationSubmit = values => {
    if (values._id) {
      props.updateOrganization(values._id, values, (err, result) => {
        // if (result) {
        //   this.setState({ error: null, success: true });
        // } else {
        //   this.setState({ error: "Update Failed" });
        // }
      });
    } else {
      props.createOrganization(values, (err, result) => {
        // if (err) {
        //   this.setState({ error: "Submission Failed" });
        // } else {
        //   this.setState({ error: null, success: true });
        // }
      });
    }
  };

  const Form = () => {
    const SuperAdmin = props.auth.user.roles.indexOf("SuperAdmin") > -1;
    const accountTypes = ["Savings", "Current"];
    const statuses = [
      "New",
      "Active",
      "Inactive",
      "Dinied",
      "SubmitForApproval",
      "Approved",
      "AwaitingForApproval",
      "Processing",
      "Deleted"
    ];
    return (
      <Paper className={classes.formRootPaper} elevation={1}>
        <form onSubmit={handleSubmit(onOrganizationSubmit)}>
          <Typography
            component="h1"
            variant="h5"
            align="left"
            className={classes.typographyheader}
          >
            Basic Info
          </Typography>
          {SuperAdmin && (
            <Field
              className={classNames(classes.textBase, classes.selectBase)}
              name="status"
              component={SelectField}
              label="Status"
            >
              {statuses.map(status => (
                <option value={status} key={status}>
                  {status}
                </option>
              ))}
            </Field>
          )}

          <Field
            className={classes.textBase}
            name="type"
            component={TextField}
            label="Company Type"
          />
          <Field
            className={classes.textBase}
            name="name"
            component={TextField}
            label="Company Name"
            disabled
          />
          <Field
            className={classes.textBase}
            name="address.line1"
            component={TextField}
            label="Plot/Street"
          />
          <Field
            className={classes.textBase}
            name="address.line2"
            component={TextField}
            label="Area/Locality"
          />
          <Field
            className={classes.textBase}
            name="address.city"
            component={TextField}
            label="City"
            disabled={true}
          />
          <Field
            className={classNames(classes.textBase, classes.selectBase)}
            name="address.state"
            component={TextField}
            disabled={true}
            label="State"
          />
          <Field
            className={classes.textBase}
            name="address.pincode"
            component={TextField}
            label="Pincode"
          />

          <Field
            className={classes.textBase}
            name="primaryEmail"
            component={TextField}
            label="Email"
          />
          <Field
            className={classes.textBase}
            name="primaryPhone"
            component={TextField}
            label="Phone"
          />
          <Typography
            component="h1"
            variant="h5"
            align="left"
            className={classes.typographyheader}
          >
            Company Identity
          </Typography>

          <Field
            className={classes.textBase}
            name="panNumber"
            component={TextField}
            label="Pan Number"
          />
          <Field
            className={classes.textBase}
            name="gstNumber"
            component={TextField}
            label="GST"
          />

          <Typography
            component="h1"
            variant="h5"
            align="left"
            className={classes.typographyheader}
          >
            Bank Details
          </Typography>

          <Field
            className={classes.textBase}
            name="bankAccount.accountNumber"
            component={TextField}
            label="Account Number"
          />
          <Field
            className={classes.textBase}
            name="bankAccount.accountName"
            component={TextField}
            label="Account Name"
          />

          <Field
            className={classNames(classes.textBase, classes.selectBase)}
            name="bankAccount.accountType"
            component={SelectField}
            label="Account Type"
          >
            {accountTypes.map(accountType => (
              <option value={accountType} key={accountType}>
                {accountType}
              </option>
            ))}
          </Field>
          <Field
            className={classes.textBase}
            name="bankAccount.bankName"
            component={TextField}
            label="Bank Name"
          />

          <Field
            className={classes.textBase}
            name="bankAccount.bankBranch"
            component={TextField}
            label="Bank Branch"
          />
          <Field
            className={classes.textBase}
            name="bankAccount.ifscCode"
            component={TextField}
            label="IFSC Code"
          />
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
  return <Form />;
}

const mapStateToProps = state => ({
  initialValues: state.organizations.details.data,
  organizations: state.organizations,
  auth: state.auth
});

const mapDispatchToProps = {
  getOrganization: OrgActions.getOrganization,
  updateOrganization: OrgActions.updateOrganization,
  createOrganization: OrgActions.createOrganization
};

let OrganizationReduxForm = reduxForm({
  form: "OrganizationForm"
  // validate
})(OrganizationForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(OrganizationReduxForm));
