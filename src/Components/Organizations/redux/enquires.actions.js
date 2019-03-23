import API from "../../../Api";
export function getEnquiries() {
  return dispatch => {
    API.enquires.get().then(
      result => {
        dispatch({
          type: "ENQUIRIES_FETCH_SUCCESS",
          data: result
        });
      },
      err => dispatch({ type: "ENQUIRIES_FETCH_ERROR", data: err.message })
    );
  };
}


export function approveEnquiry(data, callback) {
  return dispatch =>
    API.approveEnquiry.post(null, { ...data }).then(
      result => {
        callback(null, result);
      },
      err => callback(err)
    );
}

export function getEnquiry(id) {
  return dispatch =>
    API.enquires.get(id).then(
      result => {
        dispatch({
          type: "ENQUIRY_FETCH_SUCCESS",
          data: result
        });
      },
      err => dispatch({ type: "ENQUIRY_FETCH_ERROR", data: err.message })
    );
}

export function updateEnquiry(id, data, callback) {
  return dispatch =>
    API.enquires.put(id, { ...data }).then(
      result => {
        callback(null, result);
      },
      err => callback(err)
    );
}