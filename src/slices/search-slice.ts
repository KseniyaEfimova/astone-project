import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Suggestion } from '../types/star-wars-api-types';

export interface SearchState {
  query: string;
  suggestions: Suggestion[];
}

const initialState: SearchState = {
  query: '',
  suggestions: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSuggestions: (state, action: PayloadAction<Suggestion[]>) => {
      state.suggestions = action.payload;
    },
    clearSearch: state => {
      state.query = '';
      state.suggestions = [];
    },
  },
});

export const { setQuery, setSuggestions, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;
