import React from "react";
import { Field } from "redux-form";

//material ui
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { Paper } from "@material-ui/core";

//custom styles
import styles from "../partners.styles";

//inputs
import TextField from "../../../Common/Inputs/TextField";
import SelectField from "../../../Common/Inputs/SelectField";

function BussinessForm(props) {
  const companyTypes = [
    "Individual",
    "Sole proprietorship concern",
    "Partnership firm regd/unregd",
    "Single Person Company",
    "Limited",
    "Private Limited"
  ];
  const accountTypes = ["Savings", "Current"];

  const { classes } = props;
  let content = (
    <Paper className={classes.formRootPaper}>
      <div className={classes.heading}>
        <h3>Basic Info</h3>
      </div>

      <div>
        {false && <Field name="organization._id" component={TextField} />}
        <Field
          className={classNames(classes.textBase, classes.selectBase)}
          name="organization.companyType"
          component={SelectField}
          label="Company Type"
        >
          {companyTypes.map(companyType => (
            <option value={companyType} key={companyType}>
              {companyType}
            </option>
          ))}
        </Field>
        <Field
          className={classes.textBase}
          name="organization.name"
          component={TextField}
          label="Company Name"
        />
        <Field
          className={classes.textBase}
          name="brand.name"
          component={TextField}
          label="Primary Brand Name"
        />

        <Field
          className={classes.textBase}
          name="organization.address.line1"
          component={TextField}
          label="Plot/Street"
        />
        <Field
          className={classes.textBase}
          name="organization.address.line2"
          component={TextField}
          label="Area/Locality"
        />
        <Field
          className={classes.textBase}
          name="organization.address.city"
          component={TextField}
          label="City"
          disabled={true}
        />
        <Field
          className={classes.textBase}
          name="organization.address.state"
          component={TextField}
          disabled={true}
          label="State"
        />
        <Field
          className={classes.textBase}
          name="organization.address.pincode"
          component={TextField}
          label="Pincode"
        />
      </div>
      <div className={classes.heading}>
        <h3>Company Identity</h3>
      </div>
      <div>
        <Field
          className={classes.textBase}
          name="organization.panNumber"
          component={TextField}
          label="PAN Number*"
        />
        <Field
          className={classes.textBase}
          name="organization.gstNumber"
          component={TextField}
          label="GST*"
        />
      </div>
      <div className={classes.heading}>
        <h3>Bank Details</h3>
      </div>
      <div>
        <Field
          className={classes.textBase}
          name="organization.bankAccount.accountNumber"
          component={TextField}
          label="Account Number"
        />
        <Field
          className={classes.textBase}
          name="organization.bankAccount.accountName"
          component={TextField}
          label="Account Name"
        />

        <Field
          className={classNames(classes.textBase, classes.selectBase)}
          name="organization.bankAccount.accountType"
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
          name="organization.bankAccount.bankName"
          component={TextField}
          label="Bank Name"
        />

        <Field
          className={classes.textBase}
          name="organization.bankAccount.bankBranch"
          component={TextField}
          label="Bank Branch"
        />
        <Field
          className={classes.textBase}
          name="organization.bankAccount.ifscCode"
          component={TextField}
          label="IFSC Code"
        />
      </div>
      <div className={classes.heading}>
        <h3>Bank Details</h3>
      </div>
      <div>
        <Field
          name="organization.productTypes"
          component={CheckboxGroup}
          options={props.productTypes}
        />
      </div>
      <div>
        <Field
          name="organization.describe"
          style={{ width: "90%" }}
          component={TextField}
          label="Describe more about your products or services"
        />
      </div>
    </Paper>
  );
  return content;
}
export default withStyles(styles)(BussinessForm);

//-----------------------------------------------------------------------
//-----------------------------CheckboxGroup-----------------------------
//-----------------------------------------------------------------------

class CheckboxGroup extends React.Component {
  checkboxGroup() {
    let { label, options, input, meta } = this.props;

    return options.map((option, index) => {
      return (
        <div className="checkbox" key={index}>
          <label>
            <input
              type="checkbox"
              name={`${input.name}[${index}]`}
              value={option.name}
              checked={input.value.indexOf(option.name) !== -1}
              onChange={event => {
                const newValue = [...input.value];
                if (event.target.checked) {
                  newValue.push(option.name);
                } else {
                  newValue.splice(newValue.indexOf(option.name), 1);
                }

                return input.onChange(newValue);
              }}
            />
            {option.name}
          </label>
          <Error meta={meta} />
        </div>
      );
    });
  }

  render() {
    return <div>{this.checkboxGroup()}</div>;
  }
}
const Error = ({ meta: { touched, error } }) =>
  touched && error ? (
    <p style={{ color: "red" }}>{"Must select any one service"}</p>
  ) : null;

//-----------------------------------------------------------------------
//-----------------------------CheckboxGroup-----------------------------
//-----------------------------------------------------------------------
