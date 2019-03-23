import API from "../../../Api";

export function getProductTypes() {
  return dispatch => {
    API.productTypes.get().then(
      result => {
        dispatch({
          type: "FETCH_PRODTYPES_SUCCESS",
          data: result
        });
      },
      err => dispatch({ type: "FETCH_PRODTYPES_ERROR", data: err.message })
    );
  };
}

export function getProductType(id) {
  return dispatch =>
    API.productTypes.get(id).then(
      result => {
        dispatch({
          type: "PRODTYPE_FETCH_SUCCESS",
          data: result
        });
      },
      err => dispatch({ type: "PRODTYPE_FETCH_ERROR", data: err.message })
    );
}

export function createProductType(data, callback) {
  return dispatch =>
    API.productTypes.post(null, { ...data }).then(
      result => {
        callback(null, result);
      },
      err => callback(err)
    );
}

export function updateProductType(id, data, callback) {
  return dispatch =>
    API.productTypes.put(id, { ...data }).then(
      result => {
        callback(null, result);
      },
      err => callback(err)
    );
}
