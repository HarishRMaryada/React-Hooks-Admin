import React, { useState, useEffect } from "react";
import { reduxForm, getFormValues } from "redux-form";
import { connect } from "react-redux";

//material ui styles
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";

//custom styles
import styles from "./partners.styles";
// form validation
import validate from "./redux/validate";
//actions
import * as OrganizationAction from "../Organizations/redux/organizations.actions";
import * as ProductTypeAction from "../ProductType/redux/producttype.actions";
import * as UserAction from "../Users/redux/users.actions";
import * as BrandAction from "../Brands/redux/brand.actions";
import * as AuthActions from "../Login/redux/login.actions";
import store from "../../Store/store";
//components
import BussinessForm from "./Components/BussinessForm";
import PersonalForm from "./Components/PersonalForm";
import Confirm from "./Components/Confirm";

function PartnerForm(props) {
  //hooks
  const [activeStep, setActiveStep] = useState(0);
  const [externalData, setExternalData] = useState(null);
  const [openLogoutView, setOpenLogoutView] = useState(false);

  const ViewLogout = () => {
    return (
      <Dialog
        fullScreen={fullScreen}
        open={openLogoutView}
        //onClose={handleCloseEnqView}
        maxWidth={"lg"}
        aria-labelledby="enq-view-dialog"
      >
        <DialogTitle id="enq-view-dialog">Submit Summary</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Form Submitted successfully and you will soon get access to evmax
            merchant.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
          className={classNames(classes.btn, classes.btnPrimary)}
            onClick={() => {
              store.dispatch(AuthActions.logout());
              props.history.push("/login");
            }}
            color="primary"
            autoFocus
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const onPartnerSubmit = values => {
    if (values.brand) {
      values.brand.organization = values.organization._id;
      if (values.brand._id) {
        props.updateBrand(values.brand._id, values.brand, (err, result) => {});
      } else {
        props.createBrand(values, (err, result) => {});
      }
    }
    if (values.organization._id) {
      values.organization.status = "AwaitingForApproval";
      props.updateOrganization(
        values.organization._id,
        values.organization,
        (err, result) => {}
      );
    }
    if (values.user._id) {
      values.user.status = "AwaitingForApproval";
      props.updateUser(values.user._id, values.user, (err, result) => {});
    }
    setOpenLogoutView(true);
  };

  const onPartnerSaveDraft = values => {
    if (values.brand) {
      values.brand.organization = values.organization._id;
      if (values.brand._id) {
        props.updateBrand(values.brand._id, values.brand, (err, result) => {});
      } else {
        props.createBrand(values, (err, result) => {});
      }
    }
    if (values.organization._id) {
      props.updateOrganization(
        values.organization._id,
        values.organization,
        (err, result) => {}
      );
    }
    if (values.user._id) {
      props.updateUser(values.user._id, values.user, (err, result) => {});
    }
  };

  const getSteps = () => {
    return ["Bussiness", "Personal", "Confirm"];
  };
  const steps = getSteps();

  const getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return <BussinessForm productTypes={props.productTypes.list.data} />;
      case 1:
        return <PersonalForm user={props.auth.user} />;

      case 2:
        return <Confirm />;
      default:
        return "Unknown stepIndex";
    }
  };
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  let _asyncRequest;
  const fetchData = () => {
    props.getProductTypes();
    _asyncRequest = props
      .getOrganization(props.auth.user.organization)
      .then(externalData => {
        _asyncRequest = null;
        setExternalData(externalData);
      });
    let brandQuery = {};
    brandQuery.organization = props.auth.user.organization;
    props.getBrands(brandQuery);
  };

  const handleInitPartnerForm = (organization, user, brand) => {
    let initData = {};
    if (organization && user) {
      initData = {
        organization: organization,
        user: user,
        brand: brand
      };
      props.initialize(initData);
    }
  };

  //hooks
  useEffect(() => {
    fetchData();
    // return  unmount(){
    //   setExternalData(null)
    // }
  }, []);
  useEffect(() => {
    if (
      props.organizations &&
      props.organizations.details &&
      props.organizations.details.data &&
      props.auth &&
      props.auth.user
    ) {
      let brand = {};
      if (props.brands && props.brands.list && props.brands.list.data) {
        brand = props.brands.list.data[0];
      }
      handleInitPartnerForm(
        props.organizations.details.data,
        props.auth.user,
        brand
      );
    }
  }, [props.organizations, props.auth, props.brands]);

  const { classes, handleSubmit, fullScreen } = props;
  let formContent = <div>Loading....</div>;
  if (
    props.auth &&
    props.auth.user &&
    props.auth.user.status === "Processing"
  ) {
    if (externalData === null) {
      formContent = <div>Loading...</div>;
    } else {
      formContent = (
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
            <form onSubmit={handleSubmit(onPartnerSubmit)}>
              {activeStep === steps.length ? (
                <div>Steps Completed</div>
              ) : (
                getStepContent(activeStep)
              )}
              <Paper className={classes.paperBase}>
                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    {activeStep === steps.length - 1 ? (
                      <Button
                        className={classNames(classes.btn, classes.btnPrimary)}
                        type="submit"
                      >
                        Submit for approval
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit(handleNext)}
                        className={classNames(classes.btn, classes.btnPrimary)}
                      >
                        NEXT
                      </Button>
                    )}
                    {
                      <Button
                        onClick={() => {
                          onPartnerSaveDraft(props.formValues);
                        }}
                        className={classNames(classes.btn, classes.btnPrimary)}
                      >
                        SAVE DRAFT
                      </Button>
                    }
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
          <div>
            <ViewLogout />
          </div>
        </div>
      );
    }
  }
  if (
    props.auth &&
    props.auth.user &&
    props.auth.user.status === "AwaitingForApproval"
  ) {
    formContent = <div>Form submitted successfully<div>
    <ViewLogout />
  </div></div>;
  }

  return formContent;
}

let PartnerReduxForm = reduxForm({
  form: "PartnerForm",
  validate
})(PartnerForm);

const mapStateToProps = state => ({
  //redux form
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  formValues: getFormValues("PartnerForm")(state),

  //redux state
  auth: state.auth,
  organizations: state.organizations,
  productTypes: state.productTypes,
  brands: state.brands
});

const mapDispatchToProps = {
  getOrganization: OrganizationAction.getOrganization,
  updateOrganization: OrganizationAction.updateOrganization,
  getProductTypes: ProductTypeAction.getProductTypes,
  updateUser: UserAction.updateUser,
  getBrands: BrandAction.getBrands,
  updateBrand: BrandAction.updateBrand,
  createBrand: BrandAction.createBrand
};

PartnerReduxForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(PartnerReduxForm);

export default withStyles(styles)(PartnerReduxForm);
