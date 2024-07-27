import { Middleware } from '@reduxjs/toolkit';
import {
  addFavorite,
  removeFavorite,
  clearFavorites,
} from '../slices/favorites-slice';

export const favoritesMiddleware: Middleware = store => next => action => {
  const result = next(action);

  if (addFavorite.match(action)) {
    console.log(`Добавлен персонаж в избранное: ${action.payload}`);
  } else if (removeFavorite.match(action)) {
    console.log(`Удален персонаж из избранного: ${action.payload}`);
  } else if (clearFavorites.match(action)) {
    console.log('Список избранных персонажей очищен');
  }

  return result;
};

// import { Middleware } from '@reduxjs/toolkit';
// import {
//   addFavorite,
//   removeFavorite,
//   clearFavorites,
// } from '../slices/favorites-slice';
// import {
//   addSearchQuery,
//   removeSearchQuery,
//   clearSearchHistory,
// } from '../slices/history-slice';

// export const appMiddleware: Middleware = store => next => action => {
//   const result = next(action);

//   if (addFavorite.match(action)) {
//     console.log(`Добавлен персонаж в избранное: ${action.payload}`);
//   } else if (removeFavorite.match(action)) {
//     console.log(`Удален персонаж из избранного: ${action.payload}`);
//   } else if (clearFavorites.match(action)) {
//     console.log('Список избранных персонажей очищен');
//   } else if (addSearchQuery.match(action)) {
//     console.log(`Добавлен поисковый запрос в историю: ${action.payload}`);
//   } else if (removeSearchQuery.match(action)) {
//     console.log(`Удален поисковый запрос из истории: ${action.payload}`);
//   } else if (clearSearchHistory.match(action)) {
//     console.log('История поиска очищена');
//   }

//   return result;
// };
