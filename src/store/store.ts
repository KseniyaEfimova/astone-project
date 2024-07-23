import { configureStore } from '@reduxjs/toolkit';
import { starWarsApiSlice } from '../slices/api-slice';
import searchReducer from '../slices/search-slice';

const store = configureStore({
  reducer: {
    [starWarsApiSlice.reducerPath]: starWarsApiSlice.reducer,
    search: searchReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(starWarsApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
