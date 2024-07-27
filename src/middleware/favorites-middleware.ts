import { Middleware } from '@reduxjs/toolkit';
import {
  addFavorite,
  removeFavorite,
  clearFavorites,
} from '../slices/favorites-slice';

export const favoritesMiddleware: Middleware = store => next => action => {
  const result = next(action);

  if (addFavorite.match(action)) {
    console.log(`Character added to favorites: ${action.payload}`);
  } else if (removeFavorite.match(action)) {
    console.log(`Character removed from favorites: ${action.payload}`);
  } else if (clearFavorites.match(action)) {
    console.log('Favorite characters list cleared');
  }

  return result;
};
