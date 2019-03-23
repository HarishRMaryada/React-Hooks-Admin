import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  FormHelperText
} from "@material-ui/core";

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl error={touched && error}>
    <InputLabel htmlFor="state-names" style={{ marginLeft: 15 }}>
      {label}
    </InputLabel>
    <Select
      error={touched && error}
      {...input}
      inputProps={{
        name: "state",
        id: "state-names"
      }}
      {...custom}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
);
const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

export default renderSelectField;
