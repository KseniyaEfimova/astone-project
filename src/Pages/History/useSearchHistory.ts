import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../Authentication/Auth-context';
import useLocalStorage from '../../Authentication/use-locale-storage';
import { UserData } from '../Favorites/useFavorites';

export const useSearchHistory = () => {
  const { getCurrentUserEmail } = useAuth();
  const [users, setUsers] = useLocalStorage<Record<string, UserData>>(
    'users',
    {}
  );
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const email = getCurrentUserEmail();
    if (email && users[email]) {
      setSearchHistory(users[email].searchHistory || []);
    } else {
      setSearchHistory([]);
    }
  }, [getCurrentUserEmail, users]);

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
        setSearchHistory(newSearchHistory);
      }
    },
    [getCurrentUserEmail, setUsers]
  );

  const addSearchQuery = useCallback(
    (query: string) => {
      const searchUrl = `/search?q=${encodeURIComponent(query)}`;
      setSearchHistory(prev => {
        const newSearchHistory = [
          searchUrl,
          ...prev.filter(item => item !== searchUrl),
        ].slice(0, 10);
        updateSearchHistory(newSearchHistory);
        return newSearchHistory;
      });
    },
    [updateSearchHistory]
  );

  const removeSearchQuery = useCallback(
    (searchUrl: string) => {
      setSearchHistory(prev => {
        const newSearchHistory = prev.filter(item => item !== searchUrl);
        updateSearchHistory(newSearchHistory);
        return newSearchHistory;
      });
    },
    [updateSearchHistory]
  );

  return { searchHistory, addSearchQuery, removeSearchQuery };
};

export default useSearchHistory;
