import React, { useState, useEffect } from "react";
import * as RandomString from "randomstring";
import { reduxForm, formValueSelector, getFormValues } from "redux-form";
import { connect } from "react-redux";
import { Redirect } from "react-router";

//material ui styles
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Button
} from "@material-ui/core";

//custom styles
import styles from "../products.styles";

// form validation
import validate from "../redux/validate";

//actions
import * as OrganizationAction from "../../Organizations/redux/organizations.actions";
import * as BrandAction from "../../Brands/redux/brand.actions";
import * as ProductTypeAction from "../../ProductType/redux/producttype.actions";
import * as ProductAction from "../redux/products.actions";

//components
import GeneralDetails from "./WizardForms/GeneralDetails";
import ProductManagement from "./WizardForms/ProductManagement";
import InventoryManagement from "./WizardForms/InventoryManagement";
import PriceManagement from "./WizardForms/PriceManagement";
import DeliveryManagement from "./WizardForms/DeliveryManagement";
import DiscountManagement from "./WizardForms/DiscountManagement";
import Confirm from "./WizardForms/Confirm";

//import SnackBar from "../../../Common/Presentators/SnackBar";

//imports
import states from "../../../Common/Data/states.json";

function ProductForm(props) {
  //hooks
  const [activeStep, setActiveStep] = useState(0);
  const [readOnly] = useState();
  const [redirect, setRedirect] = useState(false);
  // const [state, setState] = useState({});

  const onProductSubmit = values => {
    values.isCompletelyFilled = true;
    if (values._id) {
      props.updateProduct(values._id, values, (err, result) => {
        if (result) {
          setRedirect(true);
        }
        // if (result) {
        //   setState({
        //     openSnack: true,
        //     snacktype: "success",
        //     snackMsg: "SuccessFully Updated"
        //   });
        // } else {
        //   setState({
        //     openSnack: false,
        //     snacktype: "error",
        //     snackMsg: "Update Failed"
        //   });
        // }
      });
    } else {
      props.createProduct(values, (err, result) => {
        if (result) {
          setRedirect(true);
        }
        // if (result) {
        //   setState({
        //     openSnack: true,
        //     snacktype: "success",
        //     snackMsg: "SuccessFully Created"
        //   });
        // } else {
        //   setState({
        //     openSnack: false,
        //     snacktype: "error",
        //     snackMsg: "Create Failed"
        //   });
        // }
      });
    }
  };

  const onProductSaveDraft = values => {
    values.isCompletelyFilled = false;

    if (values._id) {
      props.updateProduct(values._id, values, (err, result) => {
        if (result) {
          setRedirect(true);
        }
        // if (result) {
        //   setState({
        //     openSnack: true,
        //     snacktype: "success",
        //     snackMsg: "SuccessFully Updated"
        //   });
        // } else {
        //   setState({
        //     openSnack: false,
        //     snacktype: "error",
        //     snackMsg: "Update Failed"
        //   });
        // }
      });
    } else {
      props.createProduct(values, (err, result) => {
        if (result) {
          setRedirect(true);
        }
        // if (result) {
        //   setState({
        //     openSnack: true,
        //     snacktype: "success",
        //     snackMsg: "SuccessFully Created"
        //   });
        // } else {
        //   setState({
        //     openSnack: false,
        //     snacktype: "error",
        //     snackMsg: "Create Failed"
        //   });
        // }
      });
    }
  };

  const getSteps = () => {
    return [
      "General",
      "Product",
      "Inventory",
      "Price",
      "Delivery",
      "Discount",
      "Confirm"
    ];
  };

  const getCustomContent = (productTypeValue, productTypes) => {
    let showContent = 0;

    productTypes.forEach(element => {
      if (element._id === productTypeValue && element.name === "Vehicles") {
        showContent = 0;
      }
      if (element._id === productTypeValue && element.name === "Batteries") {
        showContent = 1;
      }
      if (element._id === productTypeValue && element.name === "Accessories") {
        showContent = 2;
      }
      if (
        element._id === productTypeValue &&
        element.name === "Digital goods"
      ) {
        showContent = 3;
      }
      if (element._id === productTypeValue && element.name === "Spares") {
        showContent = 4;
      }
    });
    return showContent;
  };

  const getOrganizations = () => {
    let organizations = [];
    organizations[0] = props.organizations.details.data;
    return organizations;
  };

  const getStepContent = (
    stepIndex,
    readOnly,
    productTypes,
    organizations,
    productTypeValue,
    brands
  ) => {
    const customContent = getCustomContent(productTypeValue, productTypes);
    switch (stepIndex) {
      case 0:
        return (
          <GeneralDetails
            readOnly={readOnly}
            productTypes={productTypes}
            organizations={organizations}
            brands={brands}
          />
        );
      case 1:
        return (
          <ProductManagement
            readOnly={readOnly}
            customContent={customContent}
          />
        );
      case 2:
        return <InventoryManagement readOnly={readOnly} />;
      case 3:
        return (
          <PriceManagement readOnly={readOnly} customContent={customContent} />
        );
      case 4:
        return (
          <DeliveryManagement
            readOnly={readOnly}
            customContent={customContent}
          />
        );
      case 5:
        return (
          <DiscountManagement
            readOnly={readOnly}
            customContent={customContent}
          />
        );
      case 6:
        return <Confirm readOnly={readOnly} customContent={customContent} />;
      default:
        return "Unknown stepIndex";
    }
  };

  const fetchData = () => {
    props.getProductTypes();
    props.getOrganization(props.auth.user.organization);
    let brandQuery = {};
    brandQuery.organization = props.auth.user.organization;
    props.getBrands(brandQuery);
  };

  const fetchProduct = async () => {
    await props.getProduct(props.id);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getState = () => {
    let statesList = [];
    if (states) {
      states.forEach(element => {
        let state = {
          stateName: element,
          isSelected: false,
          ti: 0,
          basePrice: 0,
          commissionValue: 0,
          sellingPrice: 0,
          roadTax: 0,
          others: 0,
          onRoadPrice: 0
        };
        statesList.push(state);
      });
    }
    return statesList;
  };
  //hooks
  useEffect(() => {
    if (props.type === "edit" && props.id) {
      fetchProduct();
    }
    if (props.type === "create") {
      let data = {
        organization: props.auth.user.organization,
        statePrices: getState(),
        productSKU: RandomString.generate({
          length: 8,
          charset: "alphanumeric"
        })
      };
      props.initialize(data);
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (props.products.details.data && props.type === "edit") {
      props.initialize(props.products.details.data);
    }
  }, [props.products.details.data]);

  useEffect(() => {
    if (
      props.productTypes &&
      props.productTypes.list &&
      props.productTypes.list.data &&
      props.productTypeValue
    ) {
      let productCode = "";
      props.productTypes.list.data.forEach(productType => {
        if (productType._id === props.productTypeValue) {
          productCode = productType.name;
        }
      });
      if (
        props.categories &&
        props.categories.list &&
        props.categories.list.data
      ) {
        if (props.categoryValue) {
          props.categories.list.data.forEach(category => {
            if (category._id === props.categoryValue) {
              productCode = productCode + "-" + category.name;
            }
          });
        }
        if (props.subCategoryValue) {
          props.categories.list.data.forEach(category => {
            if (category._id === props.subCategoryValue) {
              productCode = productCode + "-" + category.name;
            }
          });
        }
      }

      if (
        props.organizations &&
        props.organizations.details &&
        props.organizations.details.data
      ) {
        productCode = productCode + "-" + props.organizations.details.data.name;
      }

      if (
        props.brands &&
        props.brands.details &&
        props.brands.list.data &&
        props.brandValue
      ) {
        props.brands.list.data.forEach(brand => {
          if (brand._id === props.brandValue) {
            productCode = productCode + "-" + brand.name;
          }
        });
      }
      if (props.productSKUValue) {
        productCode = productCode + "-" + props.productSKUValue;
      }
      props.change("productCode", productCode);
    }
  }, [
    props.productTypeValue,
    props.categoryValue,
    props.subCategoryValue,
    props.brandValue,
    props.productSKUValue,
    props.organizations.details.data
  ]);

  const steps = getSteps();
  const { classes, handleSubmit } = props;
  let formContent = (
    <div>
      <Paper className={classes.formRootPaper} elevation={1}>
        <div className={classes.root}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const values = {};
              const labelProps = {};

              return (
                <Step key={label} {...values} style={{ color: "green" }}>
                  <StepLabel style={{ color: "green" }} {...labelProps}>
                    {label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>
        <form onSubmit={handleSubmit(onProductSubmit)}>
          {activeStep === steps.length ? (
            <div>Steps Completed</div>
          ) : (
            getStepContent(
              activeStep,
              readOnly,
              props.productTypes.list.data,
              getOrganizations(),
              props.productTypeValue,
              props.brands.list.data
            )
          )}
          <Paper className={classes.paperBase}>
            <Grid container spacing={24}>
              <Grid item xs={6}>
                {activeStep === steps.length - 1 ? (
                  !readOnly && (
                    <Button
                      className={classNames(classes.btn, classes.btnPrimary)}
                      type="submit"
                      disabled={!props.acceptedTandCValue}
                    >
                      {props.auth.user.roles.indexOf("SuperAdmin") > -1
                        ? "Approve"
                        : "Submit for approval"}
                    </Button>
                  )
                ) : (
                  <Button
                    onClick={handleSubmit(handleNext)}
                    className={classNames(classes.btn, classes.btnPrimary)}
                  >
                    NEXT
                  </Button>
                )}
                {!readOnly && (
                  <Button
                    onClick={() => {
                      onProductSaveDraft(props.formValues);
                    }}
                    className={classNames(classes.btn, classes.btnPrimary)}
                  >
                    SAVE DRAFT
                  </Button>
                )}
              </Grid>
              <Grid item xs={4} />
              <Grid item xs={2}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classNames(classes.btn)}
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Paper>
    </div>
  );
  if (redirect) {
    return <Redirect to="/products" />;
  }
  return formContent;
}

let ProductReduxForm = reduxForm({
  form: "ProductForm",
  validate
})(ProductForm);

const selector = formValueSelector("ProductForm");

const mapStateToProps = state => ({
  //redux form
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  productTypeValue: selector(state, "productType"),
  categoryValue: selector(state, "category"),
  subCategoryValue: selector(state, "subCategory"),
  brandValue: selector(state, "brand"),
  organizationValue: selector(state, "organization"),
  productSKUValue: selector(state, "productSKU"),
  formValues: getFormValues("ProductForm")(state),
  acceptedTandCValue: selector(state, "acceptedTandC"),

  initialValues: state.products.details.data,
  //redux state
  auth: state.auth,
  products: state.products,
  organizations: state.organizations,
  brands: state.brands,
  productTypes: state.productTypes,
  categories: state.categories
});

const mapDispatchToProps = {
  getProductTypes: ProductTypeAction.getProductTypes,
  getOrganization: OrganizationAction.getOrganization,
  getBrands: BrandAction.getBrands,
  getProduct: ProductAction.getProduct,
  createProduct: ProductAction.createProduct,
  updateProduct: ProductAction.updateProduct
};

ProductReduxForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductReduxForm);

export default withStyles(styles)(ProductReduxForm);
