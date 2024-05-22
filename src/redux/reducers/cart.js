import { AGGIUNGI_CARRELLO, DELETE_FROM_CART, RESET_CART } from "../actions";

const initialState = {
  content: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case AGGIUNGI_CARRELLO:
      return {
        ...state,
        content: [...state.content, action.payload],
      };

    case DELETE_FROM_CART:
      return {
        ...state,
        //* filter
        content: state.content.filter((item, i) => {
          return i !== action.payload;
        }),
      };

    case RESET_CART:
      return {
        ...state,
        content: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
