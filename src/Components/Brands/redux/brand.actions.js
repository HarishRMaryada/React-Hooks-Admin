import API from "../../../Api";

export function createBrand(data, callback) {
  return dispatch =>
    API.brands.post(null, { ...data }).then(
      result => {
        callback(null, result);
      },
      err => callback(err)
    );
}

export function updateBrand(id, data, callback) {
  return dispatch =>
    API.brands.put(id, { ...data }).then(
      result => {
        callback(null, result);
      },
      err => callback(err)
    );
}

export function getBrands(data) {
  return dispatch => {
    API.brands.get(data).then(
      result => {
        dispatch({
          type: "BRANDS_FETCH_SUCCESS",
          data: result
        });
      },
      err => dispatch({ type: "BRANDS_FETCH_ERROR", data: err.message })
    );
  };
}

export function getBrand(id) {
  return dispatch =>
    API.brands.get(id).then(
      result => {
        dispatch({
          type: "BRAND_FETCH_SUCCESS",
          data: result
        });
      },
      err => dispatch({ type: "BRAND_FETCH_ERROR", data: err.message })
    );
}
