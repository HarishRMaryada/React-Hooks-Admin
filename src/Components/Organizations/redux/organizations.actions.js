import API from "../../../Api";

export function getOrganizations(statusObj) {
  return dispatch =>
    API.organizations.get(statusObj).then(
      result => {
        dispatch({
          type: "ORGS_FETCH_SUCCESS",
          data: result
        });
      },
      err => dispatch({ type: "ORGS_FETCH_ERROR", data: err.message })
    );
}

export function getOrganization(id) {
  return dispatch =>
    API.organizations.get(id).then(
      result => {
        dispatch({
          type: "ORG_FETCH_SUCCESS",
          data: result
        });
      },
      err => dispatch({ type: "ORG_FETCH_ERROR", data: err.message })
    );
}


export function createOrganization(data, callback) {
  return dispatch =>
    API.organizations.post(null, { ...data }).then(
      result => {
        callback(null, result);
      },
      err => callback(err)
    );
}

export function updateOrganization(id, data, callback) {
  return dispatch =>
    API.organizations.put(id, { ...data }).then(
      result => {
        callback(null, result);
      },
      err => callback(err)
    );
}
