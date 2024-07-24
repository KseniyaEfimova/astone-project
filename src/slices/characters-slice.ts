import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterWithImage } from '../types/star-wars-api-types';

export interface CharactersState {
  list: CharacterWithImage[];
  currentCharacter: CharacterWithImage | null;
}

const initialState: CharactersState = {
  list: [],
  currentCharacter: null,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<CharacterWithImage[]>) => {
      state.list = action.payload;
    },
    setCurrentCharacter: (
      state,
      action: PayloadAction<CharacterWithImage | null>
    ) => {
      state.currentCharacter = action.payload;
    },
  },
});

export const { setCharacters, setCurrentCharacter } = charactersSlice.actions;
export default charactersSlice.reducer;
