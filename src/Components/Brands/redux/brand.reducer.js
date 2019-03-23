export default function brandsReducer(
  state = { list: { data: [], isLoading: false, error: null }, details: {} },
  action
) {
  switch (action.type) {
    case "BRANDS_FETCH_SUCCESS": {
      return {
        ...state,
        list: {
          data: action.data,
          isLoading: false,
          error: null
        }
      };
    }
    case "BRANDS_FETCH_ERROR": {
      return {
        ...state,
        list: {
          ...state.list,
          isLoading: false,
          error: action.data
        }
      };
    }

    case "BRAND_FETCH_SUCCESS": {
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
    case "BRAND_FETCH_ERROR": {
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
