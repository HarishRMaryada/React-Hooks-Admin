import API from "../../../Api";
export function getCategories() {
  return dispatch => {
    API.categories.get().then(
      result => {
        dispatch({
          type: "CATEGORIES_FETCH_SUCCESS",
          data: result
        });
      },
      err => dispatch({ type: "CATEGORIES_FETCH_ERROR", data: err.message })
    );
  };
}

export function createCategory(data, callback) {
  return dispatch =>
    API.categories.post(null, { ...data }).then(
      result => {
        callback(null, result);
      },
      err => callback(err)
    );
}

export function updateCategory(id, data, callback) {
  return dispatch =>
    API.categories.put(id, { ...data }).then(
      result => {
        callback(null, result);
      },
      err => callback(err)
    );
}

export function getCategory(id) {
  return dispatch =>
    API.categories.get(id).then(
      result => {
        dispatch({
          type: "CATEGORY_FETCH_SUCCESS",
          data: result
        });
      },
      err => dispatch({ type: "CATEGORY_FETCH_ERROR", data: err.message })
    );
}
