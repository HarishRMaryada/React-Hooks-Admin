import React, { useState, useEffect } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { Redirect } from "react-router";

//material ui styles
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Button, Paper } from "@material-ui/core";

//custom styles
import styles from "../categories.styles";

//actions
import * as CategoriesActions from "../redux/categories.actions";
import * as ProductTypesActions from "../../ProductType/redux/producttype.actions";

//
import validate from "../redux/validate";

import TextField from "../../../Common/Inputs/TextField";
import SelectField from "../../../Common/Inputs/SelectField";

function CategoryForm(props) {
  //hooks
  const [redirect, setRedirect] = useState(false);

  const getCategories = productTypeValue => {
    let parentCategory = [];
    if (props.categories.list.data) {
      props.categories.list.data.forEach(category => {
        if (
          !category.parentCategory &&
          category.productType._id === productTypeValue
        ) {
          parentCategory.push(category);
        }
      });
      return parentCategory;
    } else {
      return parentCategory;
    }
  };

  const onCategorySubmit = values => {
    if (values._id) {
      props.updateCategory(values._id, values, (err, result) => {
        if (result) {
          setRedirect(true);
          // this.setState({success:true})
          // this.closeCreateEditCategory();
          // this.fetchData();
        }
      });
    } else {
      props.createCategory(values, (err, result) => {
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
    props.getProductTypes({});
    if (props.type === "edit" && props.id) {
      props.getCategory(props.id);
    }
  }, []);

  useEffect(() => {
    if (
      props.type === "edit" &&
      props.catType === "subcategory" &&
      props.categories.details.data
    ) {
      let data = {
        productType: props.categories.details.data.parentCategory.productType,
        parentCategory: props.categories.details.data.parentCategory._id,
        name: props.categories.details.data.name
      };
      props.initialize(data);
    }
  }, [props.categories.details.data, props.catType, props.type]);

  const { classes, handleSubmit } = props;
  const productTypes = props.productTypes.list.data;
  if (redirect) {
    return <Redirect to="/categories" />;
  }
  return (
    <Paper className={classes.formRootPaper} elevation={1}>
      <form onSubmit={handleSubmit(onCategorySubmit)}>
        <Field
          name="productType"
          component={SelectField}
          style={{ width: 450, marginRight: 15, marginLeft: 15 }}
          label="Product Type"
        >
          {productTypes.map(productType => (
            <option value={productType._id} key={productType._id}>
              {productType.name}
            </option>
          ))}
        </Field>

        {props.catType === "subcategory" && (
          <Field
            name="parentCategory"
            component={SelectField}
            style={{ width: 450, marginRight: 15, marginLeft: 15 }}
            label="Category"
            disabled={!props.productTypeValue}
          >
            {getCategories(props.productTypeValue).map(category => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </Field>
        )}

        <Field
          name="name"
          component={TextField}
          style={{
            width: 450,
            marginLeft: 15,
            marginRight: 15
          }}
          label={props.catType === "subcategory" ? "Sub Category" : "Category"}
          disabled={
            props.catType === "subcategory"
              ? !props.categoryValue
              : !props.productTypeValue
          }
        />

        <Button
          type="submit"
          className={classNames(classes.btn, classes.btnPrimary)}
          disabled={!props.productTypeValue}
        >
          Save
        </Button>
      </form>
    </Paper>
  );
}

let CategoryReduxForm = reduxForm({
  form: "CategoryForm",
  validate
})(CategoryForm);

const selector = formValueSelector("CategoryForm");

const mapStateToProps = state => ({
  initialValues: state.categories.details.data,
  productTypes: state.productTypes,
  categories: state.categories,
  productTypeValue: selector(state, "productType"),
  categoryValue: selector(state, "parentCategory")
});

const mapDispatchToProps = {
  getCategory: CategoriesActions.getCategory,
  getCategories: CategoriesActions.getCategories,
  createCategory: CategoriesActions.createCategory,
  updateCategory: CategoriesActions.updateCategory,
  getProductTypes: ProductTypesActions.getProductTypes
};

CategoryReduxForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryReduxForm);

export default withStyles(styles)(CategoryReduxForm);
