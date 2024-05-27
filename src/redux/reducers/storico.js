import { SAVE_STORICO, TURN_OF_SPINNER } from "../actions";

const initialState = {
  storico: [],
  isLoading: true,
};

const storicoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_STORICO:
      return {
        ...state,
        storico: action.payload,
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

export default storicoReducer;
