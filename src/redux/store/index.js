import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../reducers/categories";
import userReducer from "../reducers/users";
import itemsReducer from "../reducers/items";
import cartReducer from "../reducers/cart";
import storicoReducer from "../reducers/storico";

const mainReducer = combineReducers({
  cart: cartReducer,
  categories: categoriesReducer,
  users: userReducer,
  items: itemsReducer,
  storico: storicoReducer,
});

const store = configureStore({
  reducer: mainReducer,
});

export default store;
