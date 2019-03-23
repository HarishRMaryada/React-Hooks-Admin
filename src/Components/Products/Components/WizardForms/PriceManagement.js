import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Field,
  FieldArray,
  reduxForm,
  formValueSelector,
  getFormMeta
} from "redux-form";

//material ui
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
//custom styles
import styles from "../../products.styles";

//inputs
import TextField from "../../../../Common/Inputs/TextField";

function PriceManagement(props) {
  const getPricingContent = (readOnly, showContent,statePricingValue) => {
    switch (showContent) {
      case 0:
        return getVehicles(readOnly,classes,statePricingValue);
      case 1:
        return <h1>Ev Component under Progresss</h1>;
      case 2:
        return <h1>Service under Progress</h1>;
      case 3:
        return <h1>under Progress</h1>;
      case 4:
        return <div>under Progress</div>;
      default:
        return "Work under Progress";
    }
  };
  

  ///hooks
  useEffect(() => {
    if (
      props.formmeta &&
      props.formmeta.isAllStatesSelected &&
      props.formmeta.isAllStatesSelected.active
    ) {
      if (props.isAllStatesSelectedValue) {
        props.statePricingValue.forEach(element => {
          element.isSelected = true;
        });
      } else {
        props.statePricingValue.forEach(element => {
          element.isSelected = false;
        });
      }
    }
    if (props.formmeta && props.formmeta.statePrices) {
      props.formmeta.statePrices.forEach(element => {
        if (typeof element.isSelected != "undefined") {
          if (element.isSelected.active === true) {
            //change("isAllStatesSelected", false);
            props.formmeta.isAllStatesSelected = false;
          }
        }
      });
    }
  }, [props.formmeta]);
  useEffect(() => {
    if (props.statePricingValue) {
      props.statePricingValue.forEach(element => {
        if (
          element &&
          element.basePrice &&
          element.commmissionType &&
          element.commissionValue
        ) {
          if (element.commmissionType === "percentage") {
            element.sellingPrice =
              parseInt(element.ti) +
              parseInt(element.basePrice) +
              parseInt(element.basePrice) *
                parseInt(element.commissionValue) *
                0.01;
          } else if (element.commmissionType === "fixedPrice") {
            element.sellingPrice =
              parseInt(element.ti) +
              parseInt(element.basePrice) +
              parseInt(element.commissionValue);
          }
        }
        if (element && element.sellingPrice) {
          element.onRoadPrice =
            parseInt(element.sellingPrice) +
            parseInt(element.roadTax) +
            parseInt(element.others);
        }
      });
    }
  }, [props.statePricingValue]);

  const { classes } = props;
  return (
    <Paper className={classes.formRootPaper}>
      <div className={classes.heading}>
        <h3>Price Management</h3>
      </div>
      {getPricingContent(props.readOnly, props.customContent,props.statePricingValue)}
    </Paper>
  );
}



const getVehicles = (readOnly,classes,statePricingValue) => {
  return (
    <Paper>
      <Field
        name="isAllStatesSelected"
        label="Checked"
        type="checkbox"
        component="input"
        disabled={readOnly}
      />
      <FieldArray
        name="statePrices"
        component={RenderStatePricing}
        readOnly={readOnly}
        classes={classes}
        statePricingValue={statePricingValue}
      />
    </Paper>
  );
};

function RenderStatePricing(props) {
  const { fields, readOnly,statePricingValue } = props;
  if (fields.length < 1) fields.push();
  return (
    <div>
      <Table>
        <TableHead />
        <TableBody>
          {fields.map((field, index) => (
            <TableRow key={index} index={index}>
              <TableCell>
                <Field
                  name={`${field}.isSelected`}
                  label="Checked"
                  type="checkbox"
                  component="input"
                  disabled={readOnly}
                />
              </TableCell>
              <TableCell>
                <Field
                  name={`${field}.stateName`}
                  component={TextField}
                  label="State Name"
                  disabled
                  style={{ width: 160 }}
                />
              </TableCell>
              <TableCell>
                <Field
                  name={`${field}.ti`}
                  component={TextField}
                  label="Transit Insurance"
                  disabled={
                    !(
                      statePricingValue[index] &&
                      statePricingValue[index].isSelected
                    )
                  }
                  style={{ width: 150 }}
                />
              </TableCell>
              <TableCell>
                <Field
                  name={`${field}.basePrice`}
                  component={TextField}
                  label="Base Price   (Manufacture Price)"
                  disabled={
                    !(
                      statePricingValue[index] &&
                      statePricingValue[index].isSelected
                    )
                  }
                  style={{ width: 150 }}
                />
              </TableCell>
              <TableCell>
                Commission
                <div style={{ width: 150 }}>
                  <Field
                    name={`${field}.commmissionType`}
                    component="input"
                    type="radio"
                    value="percentage"
                    disabled={
                      !(
                        statePricingValue[index] &&
                        statePricingValue[index].isSelected
                      )
                    }
                  />
                  Percentage
                </div>
                <div style={{ width: 150 }}>
                  <Field
                    name={`${field}.commmissionType`}
                    component="input"
                    type="radio"
                    value="fixedPrice"
                    disabled={
                      !(
                        statePricingValue[index] &&
                        statePricingValue[index].isSelected
                      )
                    }
                  />
                  Fixed
                </div>
              </TableCell>
              <TableCell>
                <Field
                  name={`${field}.commissionValue`}
                  component={TextField}
                  label="Comm. value"
                  disabled={
                    !(
                      statePricingValue[index] &&
                      statePricingValue[index].isSelected
                    )
                  }
                  style={{ width: 150 }}
                />
              </TableCell>
              <TableCell>
                <Field
                  name={`${field}.sellingPrice`}
                  component={TextField}
                  label="Selling Price       (Ex-Showroom Price)"
                  disabled
                  style={{ width: 150 }}
                />
              </TableCell>
              <TableCell>
                <Field
                  name={`${field}.roadTax`}
                  component={TextField}
                  label="Road Tax"
                  disabled={
                    !(
                      statePricingValue[index] &&
                      statePricingValue[index].isSelected
                    )
                  }
                  style={{ width: 150 }}
                />
              </TableCell>

              <TableCell>
                <div>
                  <Field
                    name={`${field}.others`}
                    component={TextField}
                    label="Other Taxes"
                    disabled={
                      !(
                        statePricingValue[index] &&
                        statePricingValue[index].isSelected
                      )
                    }
                    style={{ width: 100 }}
                  />
                </div>
                <div>
                  <Field
                    name={`${field}.notes`}
                    component={TextField}
                    label="Specify reason"
                    disabled={
                      !(
                        statePricingValue[index] &&
                        statePricingValue[index].isSelected
                      )
                    }
                    style={{ width: 250 }}
                  />
                </div>
              </TableCell>
              <TableCell>
                <Field
                  name={`${field}.onRoadPrice`}
                  component={TextField}
                  label="On Road Price"
                  disabled
                  style={{ width: 150 }}
                />
              </TableCell>
              <TableCell>
                <Field
                  name={`${field}.shippingCharges`}
                  component={TextField}
                  label="Shipping charges"
                  disabled={
                    !(
                      statePricingValue[index] &&
                      statePricingValue[index].isSelected
                    )
                  }
                  style={{ width: 150 }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

let PriceMgmtForm = reduxForm({
  form: "ProductForm", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
  // validate
})(PriceManagement);

const mapDispatchToProps = {};
const mapStateToProps = state => ({
  formmeta: getFormMeta("ProductForm")(state),
  statePricingValue: selector(state, "statePrices"),
  isAllStatesSelectedValue: selector(state, "isAllStatesSelected")
});
const selector = formValueSelector("ProductForm");

PriceMgmtForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(PriceMgmtForm);

export default withStyles(styles)(PriceMgmtForm);
