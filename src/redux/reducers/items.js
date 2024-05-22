import { SAVE_ITEMS } from "../actions";

const initialState = {
  available: [],
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ITEMS:
      return {
        ...state,
        available: action.payload,
      };

    default:
      return state;
  }
};

export default itemsReducer;
