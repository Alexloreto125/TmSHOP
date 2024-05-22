import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../reducers/categories";
import userReducer from "../reducers/users";
import itemsReducer from "../reducers/items";

const mainReducer = combineReducers({
  categories: categoriesReducer,
  users: userReducer,
  items: itemsReducer,
});

const store = configureStore({
  reducer: mainReducer,
});

export default store;
