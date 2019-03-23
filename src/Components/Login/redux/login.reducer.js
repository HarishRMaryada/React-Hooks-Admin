import {
  loadUserState,
  saveUserState,
  clearUserState
} from "../Auth/loadUserState";

export default function(state = loadUserState(), action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      let user = { ...action.data, isLoggedIn: true };
      saveUserState(user);
      return user;

    case "LOGIN_ERROR":
      return {
        ...state,
        loginError: action.data
      };
    case "LOGOUT":
      clearUserState();
      return {};

    default:
      return state;
  }
}
