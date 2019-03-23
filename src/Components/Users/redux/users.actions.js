import API from "../../../Api";

export function getUsers(data) {
  return dispatch => {
    API.users.get(data).then(
      result => {
        dispatch({
          type: "USERS_FETCH_SUCCESS",
          data: result
        });
      },
      err => dispatch({ type: "USERS_FETCH_ERROR", data: err.message })
    );
  };
}

export function getUser(id) {
  return dispatch =>
    API.users.get(id).then(
      result => {
        dispatch({
          type: "USER_FETCH_SUCCESS",
          data: result
        });
      },
      err => dispatch({ type: "USER_FETCH_ERROR", data: err.message })
    );
}

export function createUser(data, callback) {
  return dispatch =>
    API.users.post(null, { ...data }).then(
      result => {
        callback(null, result);
      },
      err => callback(err)
    );
}

export function updateUser(id, data, callback) {
  return dispatch =>
    API.users.put(id, { ...data }).then(
      result => {
        callback(null, result);
      },
      err => callback(err)
    );
}

export function deleteUserById(id, data, callback) {
  return dispatch =>
    API.users.put(id, { ...data }).then(
      result => {
        callback(null, result);
      },
      err => callback(err)
    );
}
