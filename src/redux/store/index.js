import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../reducers/categories";

const mainReducer = combineReducers({
  categories: categoriesReducer,
});

const store = configureStore({
  reducer: mainReducer,
});

export default store;
