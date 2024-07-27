import { Middleware } from '@reduxjs/toolkit';

import {
  addSearchQuery,
  removeSearchQuery,
  clearSearchHistory,
} from '../slices/history-slice';

export const searchHistoryMiddleware: Middleware = store => next => action => {
  const result = next(action);

  if (addSearchQuery.match(action)) {
    console.log(`Added search query to history: ${action.payload}`);
  } else if (removeSearchQuery.match(action)) {
    console.log(`Search query removed from history: ${action.payload}`);
  } else if (clearSearchHistory.match(action)) {
    console.log('Search history cleared');
  }

  return result;
};
