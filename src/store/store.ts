import { configureStore } from '@reduxjs/toolkit';
import { starWarsApiSlice } from '../slices/api-slice';
import searchReducer, { SearchState } from '../slices/search-slice';
import charactersReducer, { CharactersState } from '../slices/characters-slice';
import favoritesReducer, { FavoritesState } from '../slices/favorites-slice';
import { favoritesMiddleware } from '../middleware/favorites-middleware';
import { searchHistoryMiddleware } from '../middleware/search-middleware';
import historyReducer, { HistoryState } from '../slices/history-slice';

const store = configureStore({
  reducer: {
    [starWarsApiSlice.reducerPath]: starWarsApiSlice.reducer,
    search: searchReducer,
    characters: charactersReducer,
    favorites: favoritesReducer,
    history: historyReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(starWarsApiSlice.middleware)
      .concat(favoritesMiddleware)
      .concat(searchHistoryMiddleware),
});

export interface RootState {
  [starWarsApiSlice.reducerPath]: ReturnType<typeof starWarsApiSlice.reducer>;
  search: SearchState;
  characters: CharactersState;
  favorites: FavoritesState;
  history: HistoryState;
}
export type AppDispatch = typeof store.dispatch;

export default store;
