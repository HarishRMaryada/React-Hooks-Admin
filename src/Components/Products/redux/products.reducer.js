export default function productReducer(
  state = {
    list: { data: [], isLoading: false, error: null },
    details: { data: {}, error: null }
  },
  action
) {
  switch (action.type) {
    case "PRODUCTS_FETCH_SUCCESS": {
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
    case "PRODUCTS_FETCH_ERROR": {
      return {
        ...state,
        list: {
          ...state.list,
          isLoading: false,
          error: action.data
        }
      };
    }

    case "PRODUCT_FETCH_SUCCESS": {
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
    case "PRODUCT_FETCH_ERROR": {
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
