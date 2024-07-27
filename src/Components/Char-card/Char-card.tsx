import { useParams } from 'react-router-dom';
import { useGetCharacterQuery } from '../../slices/api-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useFavorites } from '../../Pages/Favorites/useFavorites.ts';
import { getCurrentCharacter } from '../../slices/characters-slice.ts';
import { setCurrentCharacter } from '../../slices/characters-slice.ts';
import FilmInfo from './Film-info.tsx';
import PlanetInfo from './Planet-info.tsx';
import FavoriteButton from '../Favorite-button/Favorite-button.tsx';
import s from './chat-card.module.css';

const CharCard = () => {
  const dispatch = useDispatch();
  const { id = '' } = useParams<{ id: string }>();

  const { data: character, isLoading, error } = useGetCharacterQuery(id);

  const currentCharacter = useSelector(getCurrentCharacter);

  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    if (character) {
      dispatch(setCurrentCharacter(character));
    }
  }, [character, dispatch]);

  if (isLoading) return <h3>Loading a character card...</h3>;
  if (error)
    return (
      <h2>Error: {error instanceof Error ? error.message : 'Unknown error'}</h2>
    );
  if (!currentCharacter) return <p>Character not found</p>;

  const currentCharacterId =
    currentCharacter.url.split('/').filter(Boolean).pop() || '';

  const isInFavorites = favorites.includes(currentCharacterId);

  return (
    <div className={s.charCard}>
      <h2 className={s.characterName}>{currentCharacter.name}</h2>
      <div className={s.cardContent}>
        <img
          className={s.characterImage}
          src={currentCharacter.imageUrl}
          alt={currentCharacter.name}
        />
        <div className={s.characterInfo}>
          <ul>
            <li>
              <span className={s.staticData}>Birth Year:</span>{' '}
              {currentCharacter.birth_year}
            </li>
            <li>
              <span className={s.staticData}>Eye Color:</span>{' '}
              {currentCharacter.eye_color}
            </li>
            <li>
              <span className={s.staticData}>Gender:</span>{' '}
              {currentCharacter.gender}
            </li>
            <li>
              <span className={s.staticData}>Hair Color:</span>{' '}
              {currentCharacter.hair_color}
            </li>
            <li>
              <span className={s.staticData}>Height:</span>{' '}
              {currentCharacter.height} cm
            </li>
            <li>
              <span className={s.staticData}>Mass:</span>{' '}
              {currentCharacter.mass} kg
            </li>
            <li>
              <span className={s.staticData}>Skin Color:</span>{' '}
              {currentCharacter.skin_color}
            </li>
            <li>
              <span className={s.staticData}>Films:</span>
              {currentCharacter.films.map((filmUrl, index) => (
                <div key={index}>
                  <FilmInfo filmUrl={filmUrl} />
                </div>
              ))}
            </li>
            <li>
              <span className={s.staticData}>Homeworld:</span>
              <PlanetInfo planetUrl={currentCharacter.homeworld} />
            </li>
          </ul>
        </div>

        <div className={s.buttons}>
          <FavoriteButton
            characterId={currentCharacterId}
            isInFavorites={isInFavorites}
            onAddFavorite={addFavorite}
            onRemoveFavorite={removeFavorite}
          />
        </div>
      </div>
    </div>
  );
};

export default CharCard;
