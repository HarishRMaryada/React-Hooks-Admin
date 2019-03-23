import API from "../../../Api";
export function loginUser(data) {
  return dispatch =>
    API.auth.post(null, data).then(
      result => {
        dispatch({
          type: "LOGIN_SUCCESS",
          data: result
        });
      },
      err => {
        dispatch({
          type: "LOGIN_ERROR",
          data: err
        });
      }
    );
}
export function logout() {
  return {
    type: "LOGOUT",
    data: {}
  };
}

export function setUserDetails(data) {
  return {
    type: "SET_USER_DETAILS",
    data
  };
}
