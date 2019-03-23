import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";

//material ui
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

//custom styles
import styles from "../../products.styles";

//redux form inputs
import TextField from "../../../../Common/Inputs/TextField";
import SelectField from "../../../../Common/Inputs/SelectField";

function ProductManagement(props) {
  const [readOnly] = useState(false);

  const getProductContent = showContent => {
    switch (showContent) {
      case 0:
        return getVehicles();
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

  const getVehicles = () => {
    return (
      <div className={classes.root}>
        <div>
          <h3>Specification</h3>
        </div>
        <Field
          className={classes.textBase}
          name="speed"
          component={TextField}
          label="Speed(30-35kmph)*"
          disabled={readOnly}
        />
        <Field
          className={classes.textBase}
          name="range"
          component={TextField}
          label="Range/Charge(160-180km/per charge)*"
          disabled={readOnly}
        />
        <Field
          className={classes.textBase}
          name="battery"
          component={TextField}
          label="Battery(2.9kwh Lithium-ion )*"
          disabled={readOnly}
        />

        <Field
          className={classes.textBase}
          name="batteryOptions"
          component={SelectField}
          label="Battery Options(Dual)"
          disabled={readOnly}
        >
          {["Single", "Dual", "Triple", "Quad"].map(element => (
            <option value={element} key={element}>
              {element}
            </option>
          ))}
        </Field>
        <Field
          className={classes.textBase}
          name="chargingTime"
          component={TextField}
          label="Charging Time(2-3hrs)*"
          disabled={readOnly}
        />
        <Field
          className={classes.textBase}
          name="voltage"
          component={TextField}
          label="Voltage(72V)*"
          disabled={readOnly}
        />
        <Field
          className={classes.textBase}
          name="motor"
          component={TextField}
          label="Motor(BLDC Motor)*"
          disabled={readOnly}
        />
        <Field
          className={classes.textBase}
          name="ratedPower"
          component={TextField}
          label="Rated Power(1000watt)*"
          disabled={readOnly}
        />
        <Field
          className={classes.textBase}
          name="maxPower"
          component={TextField}
          label="Max. Power(2500watt)*"
          disabled={readOnly}
        />

        <Field
          className={classes.textBase}
          name="wheel"
          component={TextField}
          label="Wheel(Stylish Aluminium Alloy Wheel)*"
          disabled={readOnly}
        />
        <Field
          className={classes.textBase}
          name="brakeSystem"
          component={TextField}
          label="Brake System(FR-Big/Small Disc | RR-Disc Brake)*"
          disabled={readOnly}
        />
        <Field
          className={classes.textBase}
          name="ABSController"
          component={TextField}
          label="ABS Controller(E-ABS with Regenerative Energy)"
          disabled={readOnly}
        />
        <Field
          className={classes.textBase}
          name="suspension"
          component={TextField}
          label="Suspension(Front- Hydraulic Telescopic)"
          disabled={readOnly}
        />
        <Field
          className={classes.textBase}
          name="speedometer"
          component={TextField}
          label="Speedometer"
          disabled={readOnly}
        >
          {["Analog", "Digital"].map(element => (
            <option value={element} key={element}>
              {element}
            </option>
          ))}
        </Field>
        <Field
          className={classes.textBase}
          name="climbing"
          component={TextField}
          label="Climbing(22 Degrees)"
          disabled={readOnly}
        />
        <Field
          className={classes.textBase}
          name="bootSpace"
          component={TextField}
          label="Boot Space(7ltr)"
          disabled={readOnly}
        />

        <Field
          className={classes.textBase}
          name="dimensions"
          component={TextField}
          label="Dimensions(1970X745X1150mm)"
          disabled={readOnly}
        />
        <Field
          className={classes.textBase}
          name="loadingCapacity"
          component={TextField}
          label="Loading Capacity(150Kg)"
          disabled={readOnly}
        />

        <Field
          className={classes.textBase}
          name="groundClearance"
          component={TextField}
          label="Ground Clearance(175mm)"
          disabled={readOnly}
        />

        <Field
          className={classes.textBase}
          name="seatHeight"
          component={TextField}
          label="Seat Height(800mm)"
          disabled={readOnly}
        />

        <Field
          className={classes.textBase}
          name="sideStandSensor"
          component={TextField}
          label="Side Stand Sensor(Sensor Enabled - Vehicle Will Not Start)"
          disabled={readOnly}
        />

        <Field
          className={classes.textBase}
          name="headlight"
          component={TextField}
          label="Headlight(LED with DRL Function)"
          disabled={readOnly}
        />
        <Field
          className={classes.textBase}
          name="backlight"
          component={TextField}
          label="Back light(Unique Design with LED Rear Winkers)"
          disabled={readOnly}
        />

        <Field
          className={classes.textBase}
          name="floorMat"
          component={TextField}
          label="Floor Mat(Stylish Body Coloured)"
          disabled={readOnly}
        />
        <Field
          className={classes.textBase}
          name="brakeLever"
          component={TextField}
          label="Brake Lever(CNC Machined with Lever Adjustment)"
          disabled={readOnly}
        />
        <Field
          className={classes.textBase}
          name="mobileAppConnectivity"
          component={SelectField}
          label="Mobile App Connectivity"
          disabled={readOnly}
        >
          {[{ name: "Yes", value: true }, { name: "No", value: false }].map(
            element => (
              <option value={element.value} key={element.value}>
                {element.name}
              </option>
            )
          )}
        </Field>

        <Field
          className={classes.textBase}
          name="tyre"
          component={TextField}
          label="Tyre(90/90-12 Tubeless)"
          disabled={readOnly}
        />

        <Field
          className={classes.textBase}
          name="ageingProtection"
          component={TextField}
          label="Ageing Protection(Battery with automatic sleep mode)"
          disabled={readOnly}
        />
        <Field
          className={classes.textBase}
          name="chargerSpecification"
          component={TextField}
          label="Charger Specification(Micro Charger with Auto Cut)"
          disabled={readOnly}
        />

        <Field
          className={classes.textBase}
          name="keyFeature"
          component={TextField}
          label="Key Feature"
          disabled={readOnly}
        />
        <Field
          className={classes.textBase}
          name="registration"
          component={SelectField}
          label="Registration"
          disabled={readOnly}
        >
          {[{ name: "Yes", value: true }, { name: "No", value: false }].map(
            element => (
              <option value={element.value} key={element.value}>
                {element.name}
              </option>
            )
          )}
        </Field>
        <Field
          className={classes.textBase}
          name="license"
          component={SelectField}
          label="License"
          disabled={readOnly}
        >
          {[{ name: "Yes", value: true }, { name: "No", value: false }].map(
            element => (
              <option value={element.value} key={element.value}>
                {element.name}
              </option>
            )
          )}
        </Field>
      </div>
    );
  };

  const { classes } = props;
  let productContent = (
    <div>
      <Paper className={classes.formRootPaper}>
        <div className={classes.heading}>
          <h3>Product Management</h3>
        </div>
        <div>
          <Field
            className={classes.textBase}
            name="productCode"
            component={TextField}
            label="Product code*"
            disabled
          />
          <Field
            className={classes.textBase}
            name="productTitle"
            component={TextField}
            label="Product Title*"
            disabled={readOnly}
          />
          {
            <Field
              className={classes.textBase}
              name="productSKU"
              component={TextField}
              label="SKU"
              disabled
            />
          }

          <Field
            className={classes.textBase}
            name="model"
            component={TextField}
            label="Model*"
            disabled={readOnly}
          />

          <Field
            name="isSameModelVarient"
            label="Checked"
            type="checkbox"
            component="input"
            disabled={readOnly}
          />
          <Field
            className={classes.textBase}
            name="varient"
            component={TextField}
            label="Varient(Check if varient is same as model)"
            disabled={readOnly}
          />
          <Field
            className={classes.textBase}
            name="year"
            component={TextField}
            label="Year"
            disabled={readOnly}
          />
        </div>
        {getProductContent(props.customContent)}
      </Paper>
    </div>
  );
  return productContent;
}

let ProductManagementReduxForm = reduxForm({
  form: "ProductForm", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(ProductManagement);

export default withStyles(styles)(ProductManagementReduxForm);
