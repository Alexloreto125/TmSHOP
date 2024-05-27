import { CREATE_FATTURE } from "../actions";

const initialState = {
  available: [],
};

const fattureReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FATTURE:
      return {
        ...state,
        available: action.payload,
      };

    default:
      return state;
  }
};

export default fattureReducer;
