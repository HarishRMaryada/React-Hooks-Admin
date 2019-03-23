import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Redirect } from "react-router";

//material ui styles
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Button, Paper } from "@material-ui/core";

//custom styles
import styles from "../producttypes.styles";

//actions
import * as ProductTypesActions from "../redux/producttype.actions";

import TextField from "../../../Common/Inputs/TextField";

function ProductTypeForm(props) {
  //hooks
  const [redirect, setRedirect] = useState(false);

  const onProductTypeSubmit = values => {
    if (values._id) {
      props.updateProductType(values._id, values, (err, result) => {
        if (result) {
          setRedirect(true);
          // this.setState({success:true})
          // this.closeCreateEditCategory();
          // this.fetchData();
        }
      });
    } else {
      props.createProductType(values, (err, result) => {
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
    if (props.type === "edit" && props.id) {
      props.getProductType(props.id);
    }
  }, []);

  const { classes, handleSubmit } = props;
  if (redirect) {
    return <Redirect to="/producttypes" />;
  }
  return (
    <Paper className={classes.formRootPaper} elevation={1}>
      <form onSubmit={handleSubmit(onProductTypeSubmit)}>
        <Field
          name="name"
          component={TextField}
          style={{
            width: 450,
            marginLeft: 15,
            marginRight: 15
          }}
          label="Product Type"
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
}

let PTypeReduxForm = reduxForm({
  form: "ProductTypeForm"
})(ProductTypeForm);

const mapStateToProps = state => ({
  initialValues: state.productTypes.details.data
});

const mapDispatchToProps = {
  getProductType: ProductTypesActions.getProductType,
  createProductType: ProductTypesActions.createProductType,
  updateProductType: ProductTypesActions.updateProductType
};

PTypeReduxForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(PTypeReduxForm);

export default withStyles(styles)(PTypeReduxForm);
