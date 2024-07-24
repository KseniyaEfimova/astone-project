import { configureStore } from '@reduxjs/toolkit';
import { starWarsApiSlice } from '../slices/api-slice';
import searchReducer, { SearchState } from '../slices/search-slice';
import charactersReducer, { CharactersState } from '../slices/characters-slice';

const store = configureStore({
  reducer: {
    [starWarsApiSlice.reducerPath]: starWarsApiSlice.reducer,
    search: searchReducer,
    characters: charactersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(starWarsApiSlice.middleware),
});

export interface RootState {
  [starWarsApiSlice.reducerPath]: ReturnType<typeof starWarsApiSlice.reducer>;
  search: SearchState;
  characters: CharactersState;
}
export type AppDispatch = typeof store.dispatch;

export default store;
