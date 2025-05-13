// src/redux/store.js or wherever your store is defined
import { configureStore } from '@reduxjs/toolkit';
import timersReducer from './timersSlice'; // make sure the path and name match

export const store = configureStore({
  reducer: {
    timers: timersReducer, // this name must match how you access it in useSelector
  },
});
