import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Redirect } from "react-router";

//material ui styles
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Paper, Button } from "@material-ui/core";

//custom styles
import styles from "../users.styles";

//actions
import * as UserActions from "../redux/users.actions";
import * as OrgActions from "../../Organizations/redux/organizations.actions";

//
import validate from "../redux/validate";

import TextField from "../../../Common/Inputs/TextField";
import SelectField from "../../../Common/Inputs/SelectField";

function UserForm(props) {
  //hooks
  const [readOnly] = useState(false);
  const [redirect, setRedirect] = useState(false);

  //hooks
  useEffect(() => {
    props.getOrganizations({});
    if (props.type === "edit" && props.id) {
      props.getUser(props.id);
    }
  }, []);

  const onUserSubmit = values => {
    if (values._id) {
      props.updateUser(values._id, values, (err, result) => {
        if (result) {
          setRedirect(true);
        }
        // if (result) {
        //   this.setState({ error: null, success: true });
        // } else {
        //   this.setState({ error: "Update Failed" });
        // }
      });
    } else {
      props.createUser(values, (err, result) => {
        if (result) {
          setRedirect(true);
        }
        // if (err) {
        //   this.setState({ error: "Submission Failed" });
        // } else {
        //   this.setState({ error: null, success: true });
        // }
      });
    }
  };
  const { classes, handleSubmit } = props;
  const organizations = props.organizations || [];
  const statuses = [
    "New",
    "Active",
    "Inactive",
    "SubmitForApproval",
    "Processing",
    "AwaitingForApproval",
    "Deleted"
  ];
  const getRoles = () => {
    let roles = [];
    if (props.auth.user.roles[0] === "SuperAdmin") {
      roles = ["SuperAdmin", "OrganizationAdmin"];
    } else {
      roles = ["OrganizationAdmin"];
    }
    return roles;
  };

  let bodyContent = (
    <div>
      <Paper className={classes.formRootPaper} elevation={1}>
        <form onSubmit={handleSubmit(onUserSubmit)}>
          <div>
            <Field
              className={classes.textBase}
              name="name"
              component={TextField}
              label="Name"
              disabled={readOnly}
            />
            <Field
              className={classes.textBase}
              name="email"
              component={TextField}
              label="Email"
              disabled={readOnly}
            />
            <Field
              className={classes.textBase}
              name="phone"
              component={TextField}
              label="Phone"
              disabled={readOnly}
            />
          </div>

          <div>
            <Field
              className={classes.textBase}
              name="secondaryPhone"
              component={TextField}
              label="Alternative Phone"
              disabled={readOnly}
            />
            <Field
              className={classNames(classes.textBase, classes.selectBase)}
              name="organization"
              component={SelectField}
              label="Organization"
              //  disabled
            >
              {organizations.map(organization => (
                <option value={organization._id} key={organization._id}>
                  {organization.name}
                </option>
              ))}
            </Field>
            <Field
              className={classNames(classes.textBase, classes.selectBase)}
              name="roles"
              component={SelectField}
              label="Role"
              disabled={readOnly}
            >
              {getRoles().map(role => (
                <option value={role} key={role}>
                  {role}
                </option>
              ))}
            </Field>
          </div>

          <div>
            <Field
              className={classNames(classes.textBase, classes.selectBase)}
              name="status"
              component={SelectField}
              label="Status"
              disabled={readOnly}
            >
              {statuses.map(status => (
                <option value={status} key={status}>
                  {status}
                </option>
              ))}
            </Field>
          </div>

          <Button
            className={classNames(classes.btn, classes.btnPrimary)}
            type="submit"
          >
            {"save"}
          </Button>
        </form>
      </Paper>
    </div>
  );
  if (redirect) {
    return <Redirect to="/users" />;
  }
  return bodyContent;
}

let UserReduxForm = reduxForm({
  form: "createUserForm",
  validate
})(UserForm);

const mapStateToProps = state => ({
  initialValues: state.users.details.data,
  auth: state.auth,
  organizations: state.organizations.list.data
});

const mapDispatchToProps = {
  getUser: UserActions.getUser,
  createUser: UserActions.createUser,
  updateUser: UserActions.updateUser,
  getOrganizations: OrgActions.getOrganizations
};

UserReduxForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserReduxForm);

export default withStyles(styles)(UserReduxForm);
