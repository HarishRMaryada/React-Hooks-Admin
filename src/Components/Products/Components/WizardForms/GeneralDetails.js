import React, { useState, useEffect } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";

//material ui
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Paper } from "@material-ui/core";

//custom styles
import styles from "../../products.styles";

//actions
import * as CategoriesActions from "../../../Categories/redux/categories.actions";

//inputs
import SelectField from "../../../../Common/Inputs/SelectField";

function GeneralDetails(props) {
  //hooks
  const [readOnly] = useState(false);

  //general function
  const fetchData = () => {
    props.getCategories();
  };

  const getCategories = productTypeValue => {
    let categoriesList = [];
    if (props.categories.list.data) {
      props.categories.list.data.forEach(category => {
        if (
          !category.parentCategory &&
          category.productType._id === productTypeValue
        ) {
          categoriesList.push(category);
        }
      });
      return categoriesList;
    }
    return categoriesList;
  };

  const getSubCategories = categoryValue => {
    let subCategoryList = [];
    if (props.categories.list.data) {
      props.categories.list.data.forEach(category => {
        if (
          category.parentCategory &&
          category.parentCategory._id === categoryValue
        ) {
          subCategoryList.push(category);
        }
      });
    }
    return subCategoryList;
  };

  //hooks
  useEffect(() => {
    fetchData();
  }, []);

  

  const statuses = ["Active", "Inactive", "Draft", "Publish"];
  const { classes } = props;

  let generalDetailContent = (
    <Paper className={classes.formRootPaper}>
      <div className={classes.heading}>
        <h3>General Details</h3>
      </div>

      <div>
        {/* status access to superadmin */}
        <Field
          className={classNames(classes.textBase, classes.selectBase)}
          name="status"
          component={SelectField}
          label="Status"
          disabled={
            readOnly || !(props.auth.user.roles.indexOf("SuperAdmin") > -1)
          }
        >
          {statuses.map(status => (
            <option value={status} key={status}>
              {status}
            </option>
          ))}
        </Field>
        <Field
          className={classNames(classes.textBase, classes.selectBase)}
          name="productType"
          component={SelectField}
          label="Product Type*"
          disabled={readOnly}
        >
          {props.productTypes.map(productType => (
            <option value={productType._id} key={productType._id}>
              {productType.name}
            </option>
          ))}
        </Field>
        <Field
          className={classNames(classes.textBase, classes.selectBase)}
          name="category"
          component={SelectField}
          label="Category"
          disabled={
            !props.productTypeValue ||
            readOnly ||
            !(getCategories(props.productTypeValue).length > 0)
          }
        >
          {getCategories(props.productTypeValue).map(category => (
            <option value={category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </Field>
        <Field
          className={classNames(classes.textBase, classes.selectBase)}
          name="subCategory"
          component={SelectField}
          label="Sub-Category"
          disabled={
            !props.categoryValue ||
            readOnly ||
            !(getSubCategories(props.categoryValue).length > 0)
          }
        >
          {getSubCategories(props.categoryValue).map(subCategory => (
            <option value={subCategory._id} key={subCategory._id}>
              {subCategory.name}
            </option>
          ))}
        </Field>
        <Field
          className={classNames(classes.textBase, classes.selectBase)}
          name="organization"
          component={SelectField}
          label="Company"
          //disabled
        >
          {props.organizations[0] &&
            props.organizations.map(org => (
              <option value={org._id} key={org._id}>
                {org.name}
              </option>
            ))}
        </Field>
        <Field
          className={classNames(classes.textBase, classes.selectBase)}
          name="brand"
          component={SelectField}
          label="Brand"
          disabled={readOnly}
        >
          {props.brands.map(brand => (
            <option value={brand._id} key={brand._id}>
              {brand.name}
            </option>
          ))}
        </Field>
      </div>
    </Paper>
  );
  return generalDetailContent;
}

const selector = formValueSelector("ProductForm");

const mapStateToProps = state => ({
  auth: state.auth,
  categories: state.categories,
  productTypeValue: selector(state, "productType"),
  categoryValue: selector(state, "category"),
  subCategoryValue: selector(state, "subCategory"),
  brandValue: selector(state, "brand"),
  productTitleValue: selector(state, "productTitle"),
  modelValue: selector(state, "model"),
  productSKUValue: selector(state, "productSKU")
});

const mapDispatchToProps = {
  getCategories: CategoriesActions.getCategories
};

let GeneralDetailsForm = reduxForm({
  form: "ProductForm", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
  // validate
})(GeneralDetails);

GeneralDetailsForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralDetailsForm);

export default withStyles(styles)(GeneralDetailsForm);
