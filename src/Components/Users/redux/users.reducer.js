export default function userReducer(
  state = { list: { data: [], isLoading: false, error: null }, details: {} },
  action
) {
  switch (action.type) {
    case "USERS_FETCH_SUCCESS": {
      return {
        ...state,
        list: {
          data: action.data,
          isLoading: false,
          error: null
        },
        details: {
          data: null,
          isLoading: false
        }
      };
    }
    case "USERS_FETCH_ERROR": {
      return {
        ...state,
        list: {
          ...state.list,
          isLoading: false,
          error: action.data
        }
      };
    }
    case "USER_FETCH_SUCCESS": {
      return {
        ...state,
        list: {
          ...state.list,
          isLoading: false,
          error: action.data
        },
        details: {
          data: action.data,
          isLoading: false
        }
      };
    }
    default:
      return state;
  }
}
