import { configureStore } from '@reduxjs/toolkit';
import { starWarsApiSlice } from '../slices/api-slice';

const store = configureStore({
  reducer: {
    [starWarsApiSlice.reducerPath]: starWarsApiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(starWarsApiSlice.middleware),
});

export default store;
