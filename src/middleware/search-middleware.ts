import { Middleware } from '@reduxjs/toolkit';

import {
  addSearchQuery,
  removeSearchQuery,
  clearSearchHistory,
} from '../slices/history-slice';

export const searchHistoryMiddleware: Middleware = store => next => action => {
  const result = next(action);

  if (addSearchQuery.match(action)) {
    console.log(`Добавлен поисковый запрос в историю: ${action.payload}`);
  } else if (removeSearchQuery.match(action)) {
    console.log(`Удален поисковый запрос из истории: ${action.payload}`);
  } else if (clearSearchHistory.match(action)) {
    console.log('История поиска очищена');
  }

  return result;
};
