export default function productDataReducer(
  state = {
    list: { data: [], create: [], isLoading: false, error: null },
    details: {}
  },
  action
) {
  switch (action.type) {
    case "FETCH_PRODTYPES_SUCCESS": {
      return {
        ...state,
        list: {
          data: action.data,
          isLoading: false,
          error: null
        },
        details: {
          data: null
        }
      };
    }
    case "FETCH_PRODTYPES_ERROR": {
      return {
        ...state,
        list: {
          ...state.list,
          isLoading: false,
          error: action.data
        }
      };
    }

    case "PRODTYPE_FETCH_SUCCESS": {
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
    case "PRODTYPE_FETCH_ERROR": {
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
