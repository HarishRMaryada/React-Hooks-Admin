import React, { useState,useEffect } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { Redirect } from "react-router";


//material ui styles
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Button, Paper } from "@material-ui/core";

//custom styles
import styles from "../brands.styles";

//actions
import * as BrandsActions from "../redux/brand.actions";
import * as organizationActions from "../../Organizations/redux/organizations.actions";

import TextField from "../../../Common/Inputs/TextField";
import SelectField from "../../../Common/Inputs/SelectField";

function BrandForm(props) {
  //hooks
  const [redirect, setRedirect] = useState(false);

  const onBrandSubmit = values => {
    if (values._id) {
      props.updateBrand(values._id, values, (err, result) => {
        if (result) {
          setRedirect(true);
          // this.setState({success:true})
          // this.closeCreateEditCategory();
          // this.fetchData();
        }
      });
    } else {
      props.createBrand(values, (err, result) => {
        if (result) {
          setRedirect(true);
          // this.setState({success:true})
          // this.closeCreateEditCategory();
          // this.fetchData();
        }
      });
    }
  };

  useEffect(() => {
    props.getOrganizations({});
    if (props.type === "edit" && props.id) {
      props.getBrand(props.id);
    }
  }, []);

  const { classes, handleSubmit } = props;
  const organizations = props.organizations.list.data;

  if (redirect) {
    return <Redirect to="/brands" />;
  }

  return (
    <Paper className={classes.formRootPaper} elevation={1}>
      <form onSubmit={handleSubmit(onBrandSubmit)}>
        <Field
          name="organization"
          component={SelectField}
          style={{ width: 450, marginRight: 15, marginLeft: 15 }}
          label="Company Name"
        >
          {organizations.map(organization => (
            <option value={organization._id} key={organization._id}>
              {organization.name}
            </option>
          ))}
        </Field>

        <Field
          name="name"
          component={TextField}
          style={{
            width: 450,
            marginLeft: 15,
            marginRight: 15
          }}
          label="Brand"
          disabled={!props.organizationValue}
        />

        <Button
          type="submit"
          className={classNames(classes.btn, classes.btnPrimary)}
          disabled={!props.organizationValue}
        >
          Save
        </Button>
      </form>
    </Paper>
  );
}

let BrandReduxForm = reduxForm({
  form: "BrandForm"
})(BrandForm);

const selector = formValueSelector("BrandForm");

const mapStateToProps = state => ({
  initialValues: state.brands.details.data,
  organizations: state.organizations,
  organizationValue: selector(state, "organization")
});

const mapDispatchToProps = {
  getBrand: BrandsActions.getBrand,
  createBrand: BrandsActions.createBrand,
  updateBrand: BrandsActions.updateBrand,
  getOrganizations: organizationActions.getOrganizations
};

BrandReduxForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(BrandReduxForm);

export default withStyles(styles)(BrandReduxForm);
