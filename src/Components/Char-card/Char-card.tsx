import { useNavigate, useParams } from 'react-router-dom';
import { useGetCharacterQuery } from '../../slices/api-slice';
import FilmInfo from './Film-info.tsx';
import PlanetInfo from './Planet-info.tsx';
import s from './chat-card.module.css';
import { useAuth } from '../../Authentication/Auth-context.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { useEffect } from 'react';
import { setCurrentCharacter } from '../../slices/characters-slice.ts';

const CharCard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id = '' } = useParams<{ id: string }>();
  const { data: character, isLoading, error } = useGetCharacterQuery(id);
  const currentCharacter = useSelector(
    (state: RootState) => state.characters.currentCharacter
  );

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

  const handleFavoriteAction = () => {
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }
    // TODO: Add logic to add/remove favorites
  };

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
          <button onClick={handleFavoriteAction} className={s.favoriteButton}>
            Add to Favorite
          </button>
          <button onClick={handleFavoriteAction} className={s.removeButton}>
            Remove from Favorite
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharCard;
