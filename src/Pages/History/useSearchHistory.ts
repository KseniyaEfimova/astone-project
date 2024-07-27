// import { useCallback, useEffect, useState } from 'react';
// import { useAuth } from '../../Authentication/Auth-context';
// import useLocalStorage from '../../Authentication/use-locale-storage';
// import { UserData } from '../Favorites/useFavorites';

// export const useSearchHistory = () => {
//   const { getCurrentUserEmail } = useAuth();
//   const [users, setUsers] = useLocalStorage<Record<string, UserData>>(
//     'users',
//     {}
//   );
//   const [searchHistory, setSearchHistory] = useState<string[]>([]);

//   useEffect(() => {
//     const email = getCurrentUserEmail();
//     if (email && users[email]) {
//       setSearchHistory(users[email].searchHistory || []);
//     } else {
//       setSearchHistory([]);
//     }
//   }, [getCurrentUserEmail, users]);

//   const updateSearchHistory = useCallback(
//     (newSearchHistory: string[]) => {
//       const email = getCurrentUserEmail();
//       if (email) {
//         setUsers(prevUsers => ({
//           ...prevUsers,
//           [email]: {
//             ...prevUsers[email],
//             searchHistory: newSearchHistory,
//           },
//         }));
//         setSearchHistory(newSearchHistory);
//       }
//     },
//     [getCurrentUserEmail, setUsers]
//   );

//   const addSearchQuery = useCallback(
//     (query: string) => {
//       const searchUrl = `/search?q=${encodeURIComponent(query)}`;
//       setSearchHistory(prev => {
//         const newSearchHistory = [
//           searchUrl,
//           ...prev.filter(item => item !== searchUrl),
//         ].slice(0, 10);
//         updateSearchHistory(newSearchHistory);
//         return newSearchHistory;
//       });
//     },
//     [updateSearchHistory]
//   );

//   const removeSearchQuery = useCallback(
//     (searchUrl: string) => {
//       setSearchHistory(prev => {
//         const newSearchHistory = prev.filter(item => item !== searchUrl);
//         updateSearchHistory(newSearchHistory);
//         return newSearchHistory;
//       });
//     },
//     [updateSearchHistory]
//   );

//   return { searchHistory, addSearchQuery, removeSearchQuery };
// };

// export default useSearchHistory;

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSearchQuery,
  removeSearchQuery,
  setSearchHistory,
  getSearchHistory,
} from '../../slices/history-slice';
import { useAuth } from '../../Authentication/Auth-context';
import useLocalStorage from '../../Authentication/use-locale-storage';
import { UserData } from '../Favorites/useFavorites';

export const useSearchHistory = () => {
  const dispatch = useDispatch();
  const { getCurrentUserEmail } = useAuth();
  const [users, setUsers] = useLocalStorage<Record<string, UserData>>(
    'users',
    {}
  );
  const searchHistory = useSelector(getSearchHistory);

  useEffect(() => {
    const email = getCurrentUserEmail();
    if (email && users[email]) {
      dispatch(setSearchHistory(users[email].searchHistory || []));
    } else {
      dispatch(setSearchHistory([]));
    }
  }, [getCurrentUserEmail, users, dispatch]);

  const updateSearchHistory = useCallback(
    (newSearchHistory: string[]) => {
      const email = getCurrentUserEmail();
      if (email) {
        setUsers(prevUsers => ({
          ...prevUsers,
          [email]: {
            ...prevUsers[email],
            searchHistory: newSearchHistory,
          },
        }));
        dispatch(setSearchHistory(newSearchHistory));
      }
    },
    [getCurrentUserEmail, setUsers, dispatch]
  );

  const addSearchQueryToHistory = useCallback(
    (query: string) => {
      const searchUrl = `/search?q=${encodeURIComponent(query)}`;
      const updatedHistory = [
        searchUrl,
        ...searchHistory.filter(item => item !== searchUrl),
      ].slice(0, 10);

      dispatch(addSearchQuery(query));
      updateSearchHistory(updatedHistory);
    },
    [dispatch, updateSearchHistory, searchHistory]
  );

  const removeSearchQueryFromHistory = useCallback(
    (searchUrl: string) => {
      const updatedHistory = searchHistory.filter(item => item !== searchUrl);

      dispatch(removeSearchQuery(searchUrl));
      updateSearchHistory(updatedHistory);
    },
    [dispatch, updateSearchHistory, searchHistory]
  );

  return {
    searchHistory,
    addSearchQuery: addSearchQueryToHistory,
    removeSearchQuery: removeSearchQueryFromHistory,
  };
};

export default useSearchHistory;
