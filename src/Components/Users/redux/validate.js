const validate = values => {
  const errors = {};
  const requiredFields = ["name", "email", "phone", "organization._id"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });

  if (!values.organization) {
    errors.organization = "Required";
  }
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  if (values.phone && !/^(0|[6-9][0-9]{9})$/i.test(values.phone)) {
    errors.phone = "Invalid phone number";
  }

  if (values.name && !/^[A-Z_ -]{4,50}$/i.test(values.name)) {
    errors.name = "Name must have Min. 4 & Max. 50 chars and must be alphabets";
  }

  return errors;
};

export default validate;
