import React from 'react';
import CharacterCardPreview from './CharacterCardPreview';
import s from './characters.module.css';

interface CharactersProps {
  characterIds: string[];
  favorites: string[];
  onAddFavorite: (id: string) => void;
  onRemoveFavorite: (id: string) => void;
  isFavoritesPage: boolean;
}

const Characters = ({
  characterIds,
  favorites,
  onAddFavorite,
  onRemoveFavorite,
  isFavoritesPage,
}: CharactersProps) => {
  return (
    <section className={s['characters-list']}>
      {characterIds.map(id => (
        <CharacterCardPreview
          key={id}
          id={id}
          favorites={favorites}
          onAddFavorite={onAddFavorite}
          onRemoveFavorite={onRemoveFavorite}
          isFavoritesPage={isFavoritesPage}
        />
      ))}
    </section>
  );
};

export default React.memo(Characters);
