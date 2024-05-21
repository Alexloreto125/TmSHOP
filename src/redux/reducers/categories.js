import { SAVE_CATEGORIES, TURN_OF_SPINNER } from "../actions";

const initialState = {
  available: [],
  isLoading: true,
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CATEGORIES:
      return {
        ...state,
        available: action.payload,
      };

    case TURN_OF_SPINNER:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
