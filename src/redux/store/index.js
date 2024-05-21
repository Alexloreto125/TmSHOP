import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../reducers/categories";
import userReducer from "../reducers/users";

const mainReducer = combineReducers({
  categories: categoriesReducer,
  users: userReducer,
});

const store = configureStore({
  reducer: mainReducer,
});

export default store;
