import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCharacterImageUrl } from '../utils/API/get-character-image.ts';
import {
  CharactersResponse,
  CharacterWithImage,
} from '../types/star-wars-api-types.ts';

export const starWarsApiSlice = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: builder => ({
    getSomeCharacters: builder.query<CharacterWithImage[], void>({
      query: () => 'people',

      transformResponse: (response: CharactersResponse) => {
        return response.results.map(character => ({
          ...character,
          imageUrl: getCharacterImageUrl(character.url),
        }));
      },
    }),
  }),
});

export const useGetSomeCharactersQuery: typeof starWarsApiSlice.endpoints.getSomeCharacters.useQuery =
  starWarsApiSlice.endpoints.getSomeCharacters.useQuery;
