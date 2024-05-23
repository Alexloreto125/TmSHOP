import { CREATE_ITEM, SAVE_ITEMS } from "../actions";

const initialState = {
  available: [],
  item: {
    name: "",
    prezzo: "",
    categoryID: null,
    codice: "",
    descrizione: "",
    image: "",
  },
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ITEMS:
      return {
        ...state,
        available: action.payload,
      };
    case CREATE_ITEM:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
};

export default itemsReducer;
