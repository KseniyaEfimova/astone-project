import { useEffect, useState } from 'react';
import { useFavorites } from './useFavorites';
import CharactersWrapper from '../Characters/CharactersWrapper';
import s from './favorites.module.css';

const Favorites = () => {
  const { favorites, clearAllFavorites } = useFavorites();
  const [localFavorites, setLocalFavorites] = useState<string[]>([]);

  useEffect(() => {
    setLocalFavorites(favorites);
  }, [favorites]);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all your favorites?')) {
      clearAllFavorites();
    }
  };

  return (
    <section className={s['favorites-page']}>
      <h2>Favorites Characters</h2>
      {localFavorites.length === 0 ? (
        <p>You haven't added anything to your favorites yet</p>
      ) : (
        <>
          <button onClick={handleClearAll} className={s['clear-all-button']}>
            Clear all favorites
          </button>
          <CharactersWrapper
            characterIds={localFavorites}
            isFavoritesPage={true}
          />
        </>
      )}
    </section>
  );
};

export default Favorites;
