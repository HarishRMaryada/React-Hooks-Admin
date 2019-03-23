export default function organizationReducer(
  state = { list: { data: [], isLoading: false, error: null }, details: {} },
  action
) {
  switch (action.type) {
    case "ORGS_FETCH_SUCCESS": {
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
    case "ORGS_FETCH_ERROR": {
      return {
        ...state,
        list: {
          ...state.list,
          isLoading: false,
          error: action.data
        }
      };
    }

    case "ORG_FETCH_SUCCESS": {
      return {
        ...state,
        list: {
          ...state.list,
          error: action.data
        },
        details: {
          data: action.data
        }
      };
    }
    case "ORG_FETCH_ERROR": {
      return {
        ...state,
        list: {
          ...state.list,
          error: null
        },
        details: {
          data: null,
          error: action.data
        }
      };
    }

    default:
      return state;
  }
}
