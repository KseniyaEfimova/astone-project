import React from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../../Components/Favorite-button/Favorite-button';
import { useGetCharacterQuery } from '../../slices/api-slice';
import s from './characters.module.css';

const CharacterCardPreview = React.memo(
  ({
    id,
    favorites,
    onAddFavorite,
    onRemoveFavorite,
    isFavoritesPage,
  }: {
    id: string;
    favorites: string[];
    onAddFavorite: (id: string) => void;
    onRemoveFavorite: (id: string) => void;
    isFavoritesPage: boolean;
  }) => {
    const navigate = useNavigate();
    const { data: character, isLoading, error } = useGetCharacterQuery(id);

    if (isLoading) return <div>Loading Character Card Preview...</div>;
    if (error) return <div>Character loading error</div>;
    if (!character) return null;

    const handleShowCharacter = () => {
      navigate(`/character/${id}`);
    };

    const isInFavorites = favorites.includes(id);

    return (
      <div className={s['character-card']}>
        <div onClick={handleShowCharacter}>
          <div className={s['character-image']}>
            <img src={character.imageUrl} alt={character.name} />
          </div>
          <h3 className={s['character-name']}>{character.name}</h3>
        </div>

        <FavoriteButton
          characterId={id}
          isInFavorites={isInFavorites}
          onAddFavorite={onAddFavorite}
          onRemoveFavorite={onRemoveFavorite}
        />
      </div>
    );
  }
);

export default CharacterCardPreview;
