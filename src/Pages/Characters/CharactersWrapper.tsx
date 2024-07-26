import React from 'react';
import { useLocation } from 'react-router-dom';
import { useFavorites } from '../Favorites/useFavorites';
import Characters from './Characters-list';

interface CharactersWrapperProps {
  characterIds?: string[];
  isFavoritesPage?: boolean;
}

const CharactersWrapper = ({
  characterIds = [],
  isFavoritesPage = false,
}: CharactersWrapperProps) => {
  const location = useLocation();
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isOnFavoritesPage =
    isFavoritesPage || location.pathname === '/favorites';
  const charactersToShow = isOnFavoritesPage ? favorites : characterIds;

  return (
    <Characters
      characterIds={charactersToShow}
      favorites={favorites}
      onAddFavorite={addFavorite}
      onRemoveFavorite={removeFavorite}
      isFavoritesPage={isOnFavoritesPage}
    />
  );
};

export default React.memo(CharactersWrapper);
