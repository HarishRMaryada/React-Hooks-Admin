import store from "../../../Store/store";
const validate = values => {
  let errors = {};
  let requiredFields = ["productType","brand"];
  let producttype = "";
  if (store.getState().productTypes.list.data && values.productType) {
    store.getState().productTypes.list.data.forEach(element => {
      if (element._id === values.productType) {
        producttype = element.name;
      }
    });
  }
  if (producttype === "Vehicles") {
    requiredFields = [
      "productTitle",
      "speed",
      "range",
      "battery",
      "chargingTime",
      "voltage",
      "motor",
      "ratedPower",
      "maxPower",
      "wheel",
      "brakeSystem",
      "registration",
      "license"
    ];
  }
  if (producttype === "Batteries") {
    requiredFields = [];
  }
  if (producttype === "Accessories") {
    requiredFields = [];
  }
  if (producttype === "Digital goods") {
    requiredFields = [];
  }
  if (producttype === "Spares") {
    requiredFields = [];
  }

  requiredFields.forEach(field => {
    //add contion for registration and license
    if (!values[field] && !(field === "registration" || field === "license")) {
      errors[field] = "Required";
    }
  });

  // if (values.colors) {
  //   values.colors.forEach((color, index) => {
  //     const colorErrors = {};
  //     if (!color || !color.name) {
  //       colorErrors.name = "Required";
  //       colorErrors[index] = colorErrors;
  //     }
  //   });
  // }

  if (values.statePrices) {
    const statesArrayErrors = [];
    values.statePrices.forEach((state, index) => {
      const stateErrors = {};
      if (
        state &&
        state.commmissionType === "percentage" &&
        state.commissionValue >= 100
      ) {
        stateErrors.commissionValue = "Must be less than 100";
        statesArrayErrors[index] = stateErrors;
      }
    });
    if (statesArrayErrors.length) {
      errors.statePrices = statesArrayErrors;
    }
  }

  return errors;
};

export default validate;
