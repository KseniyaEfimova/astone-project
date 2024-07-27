import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FavoritesState {
  list: string[];
}

const initialState: FavoritesState = {
  list: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.list.includes(action.payload)) {
        state.list.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(id => id !== action.payload);
    },
    clearFavorites: state => {
      state.list = [];
    },
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.list = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites, setFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
