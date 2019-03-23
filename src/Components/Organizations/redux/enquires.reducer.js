export default function enquiryReducer(
  state = { list: { data: [], isLoading: false, error: null }, details: {} },
  action
) {
  switch (action.type) {
    case "ENQUIRIES_FETCH_SUCCESS": {
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
    case "ENQUIRIES_FETCH_ERROR": {
      return {
        ...state,
        list: {
          ...state.list,
          isLoading: false,
          error: action.data
        }
      };
    }

    case "ENQUIRY_FETCH_SUCCESS": {
      return {
        ...state,
        list: {
          ...state.list,
          isLoading: false,
          error: null
        },
        details: {
          data: action.data,
          isLoading: false
        }
      };
    }
    case "ENQUIRY_FETCH_ERROR": {
      return {
        ...state,
        list: {
          ...state.list,
          isLoading: false,
          error: action.data
        }
      };
    }

    default:
      return state;
  }
}
