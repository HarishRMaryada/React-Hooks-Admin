const validate = values => {
  const errors = {};
  const requiredFields = ["name", "productType"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });

  return errors;
};

export default validate;
