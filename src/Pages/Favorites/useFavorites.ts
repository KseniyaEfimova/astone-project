// import { useCallback, useEffect, useState } from 'react';
// import { useAuth } from '../../Authentication/Auth-context';
// import useLocalStorage from '../../Authentication/use-locale-storage';

// export interface UserData {
//   password: string;
//   favorites: string[];
//   searchHistory: string[];
// }

// export const useFavorites = () => {
//   const { getCurrentUserEmail } = useAuth();
//   const [users, setUsers] = useLocalStorage<Record<string, UserData>>(
//     'users',
//     {}
//   );
//   const [favorites, setFavorites] = useState<string[]>([]);

//   useEffect(() => {
//     const email = getCurrentUserEmail();
//     if (email) {
//       setFavorites(users[email]?.favorites || []);
//     } else {
//       setFavorites([]);
//     }
//   }, [getCurrentUserEmail, users]);

//   const updateFavorites = useCallback(
//     (newFavorites: string[]) => {
//       const email = getCurrentUserEmail();
//       if (email) {
//         setUsers(prevUsers => ({
//           ...prevUsers,
//           [email]: {
//             ...prevUsers[email],
//             favorites: newFavorites,
//           },
//         }));
//         setFavorites(newFavorites);
//       }
//     },
//     [getCurrentUserEmail, setUsers]
//   );

//   const addFavorite = useCallback(
//     (characterId: string) => {
//       setFavorites(prev => {
//         const newFavorites = [...new Set([...prev, characterId])];
//         updateFavorites(newFavorites);
//         return newFavorites;
//       });
//     },
//     [updateFavorites]
//   );

//   const removeFavorite = useCallback(
//     (characterId: string) => {
//       setFavorites(prev => {
//         const newFavorites = prev.filter(id => id !== characterId);
//         updateFavorites(newFavorites);
//         return newFavorites;
//       });
//     },
//     [updateFavorites]
//   );

//   const clearAllFavorites = useCallback(() => {
//     updateFavorites([]);
//   }, [updateFavorites]);

//   return { favorites, addFavorite, removeFavorite, clearAllFavorites };
// };

// export default useFavorites;

import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../Authentication/Auth-context';
import useLocalStorage from '../../Authentication/use-locale-storage';
import {
  addFavorite as addFavoriteAction,
  removeFavorite as removeFavoriteAction,
  clearFavorites as clearFavoritesAction,
  setFavorites as setFavoritesAction,
} from '../../slices/favorites-slice';

export interface UserData {
  password: string;
  favorites: string[];
  searchHistory: string[];
}

export const useFavorites = () => {
  const dispatch = useDispatch();
  const { getCurrentUserEmail } = useAuth();
  const [users, setUsers] = useLocalStorage<Record<string, UserData>>(
    'users',
    {}
  );
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const email = getCurrentUserEmail();
    if (email) {
      const userFavorites = users[email]?.favorites || [];
      setFavorites(userFavorites);
      dispatch(setFavoritesAction(userFavorites));
    } else {
      setFavorites([]);
      dispatch(setFavoritesAction([]));
    }
  }, [getCurrentUserEmail, users, dispatch]);

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
        dispatch(setFavoritesAction(newFavorites));
      }
    },
    [getCurrentUserEmail, setUsers, dispatch]
  );

  const addFavorite = useCallback(
    (characterId: string) => {
      setFavorites(prev => {
        const newFavorites = [...new Set([...prev, characterId])];
        updateFavorites(newFavorites);
        dispatch(addFavoriteAction(characterId));
        return newFavorites;
      });
    },
    [updateFavorites, dispatch]
  );

  const removeFavorite = useCallback(
    (characterId: string) => {
      setFavorites(prev => {
        const newFavorites = prev.filter(id => id !== characterId);
        updateFavorites(newFavorites);
        dispatch(removeFavoriteAction(characterId));
        return newFavorites;
      });
    },
    [updateFavorites, dispatch]
  );

  const clearAllFavorites = useCallback(() => {
    updateFavorites([]);
    dispatch(clearFavoritesAction());
  }, [updateFavorites, dispatch]);

  return { favorites, addFavorite, removeFavorite, clearAllFavorites };
};

export default useFavorites;
