import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HistoryState {
  searchQueries: string[];
}

const initialState: HistoryState = {
  searchQueries: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addSearchQuery: (state, action: PayloadAction<string>) => {
      const searchUrl = `/search?q=${encodeURIComponent(action.payload)}`;
      state.searchQueries = [
        searchUrl,
        ...state.searchQueries.filter(item => item !== searchUrl),
      ].slice(0, 10);
    },
    removeSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQueries = state.searchQueries.filter(
        item => item !== action.payload
      );
    },
    clearSearchHistory: state => {
      state.searchQueries = [];
    },
    setSearchHistory: (state, action: PayloadAction<string[]>) => {
      state.searchQueries = action.payload;
    },
  },
});

export const {
  addSearchQuery,
  removeSearchQuery,
  clearSearchHistory,
  setSearchHistory,
} = historySlice.actions;

export default historySlice.reducer;
