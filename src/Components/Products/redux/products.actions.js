import API from "../../../Api";

export function getProducts(searchObj) {
  return dispatch => {
    API.products.get(searchObj).then(
      result => {
        dispatch({
          type: "PRODUCTS_FETCH_SUCCESS",
          data: result
        });
      },
      err => dispatch({ type: "PRODUCTS_FETCH_ERROR", data: err.message })
    );
  };
}

export function getProduct(productId) {
  return dispatch =>
    API.products.get(productId).then(
      result => {
        dispatch({
          type: "PRODUCT_FETCH_SUCCESS",
          data: result
        });
      },
      err => dispatch({ type: "PRODUCT_FETCH_ERROR", data: err.message })
    );
}


export function createProduct(data, callback) {
  return dispatch =>
    API.products.post(null, { ...data }).then(
      result => {
        callback(null, result);
      },
      err => callback(err)
    );
}

export function updateProduct(id, data, callback) {
  return dispatch =>
    API.products.put(id, { ...data }).then(
      result => {
        callback(null, result);
      },
      err => callback(err)
    );
}
