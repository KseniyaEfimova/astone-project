import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../Authentication/Auth-context';
import useLocalStorage from '../../Authentication/use-locale-storage';

export interface UserData {
  password: string;
  favorites: string[];
  searchHistory: string[];
}

export const useFavorites = () => {
  const { getCurrentUserEmail } = useAuth();
  const [users, setUsers] = useLocalStorage<Record<string, UserData>>(
    'users',
    {}
  );
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const email = getCurrentUserEmail();
    if (email) {
      setFavorites(users[email]?.favorites || []);
    } else {
      setFavorites([]);
    }
  }, [getCurrentUserEmail, users]);

  const updateFavorites = useCallback(
    (newFavorites: string[]) => {
      const email = getCurrentUserEmail();
      if (email) {
        setUsers(prevUsers => ({
          ...prevUsers,
          [email]: {
            ...prevUsers[email],
            favorites: newFavorites,
          },
        }));
        setFavorites(newFavorites);
      }
    },
    [getCurrentUserEmail, setUsers]
  );

  const addFavorite = useCallback(
    (characterId: string) => {
      setFavorites(prev => {
        const newFavorites = [...new Set([...prev, characterId])];
        updateFavorites(newFavorites);
        return newFavorites;
      });
    },
    [updateFavorites]
  );

  const removeFavorite = useCallback(
    (characterId: string) => {
      setFavorites(prev => {
        const newFavorites = prev.filter(id => id !== characterId);
        updateFavorites(newFavorites);
        return newFavorites;
      });
    },
    [updateFavorites]
  );

  const clearAllFavorites = useCallback(() => {
    updateFavorites([]);
  }, [updateFavorites]);

  return { favorites, addFavorite, removeFavorite, clearAllFavorites };
};

export default useFavorites;
