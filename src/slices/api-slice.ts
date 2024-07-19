import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCharacterImageUrl } from '../utils/API/get-character-image.ts';
import {
  Character,
  CharactersResponse,
  CharacterWithImage,
  Film,
  Planet,
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
    getCharacter: builder.query<CharacterWithImage, string>({
      query: id => `people/${id}/`,
      transformResponse: (character: Character) => ({
        ...character,
        imageUrl: getCharacterImageUrl(character.url),
      }),
    }),
    getFilm: builder.query<Film, number>({
      query: id => `films/${id}/`,
    }),
    getPlanet: builder.query<Planet, number>({
      query: id => `planets/${id}/`,
    }),
  }),
});

export const useGetSomeCharactersQuery: typeof starWarsApiSlice.endpoints.getSomeCharacters.useQuery =
  starWarsApiSlice.endpoints.getSomeCharacters.useQuery;

export const useGetCharacterQuery: typeof starWarsApiSlice.endpoints.getCharacter.useQuery =
  starWarsApiSlice.endpoints.getCharacter.useQuery;

export const useGetFilmQuery: typeof starWarsApiSlice.endpoints.getFilm.useQuery =
  starWarsApiSlice.endpoints.getFilm.useQuery;

export const useGetPlanetQuery: typeof starWarsApiSlice.endpoints.getPlanet.useQuery =
  starWarsApiSlice.endpoints.getPlanet.useQuery;
