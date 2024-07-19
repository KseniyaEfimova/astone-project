import { useNavigate, useParams } from 'react-router-dom';
import { useGetCharacterQuery } from '../../slices/api-slice';
import FilmInfo from './Film-info.tsx';
import PlanetInfo from './Planet-info.tsx';
import s from './chat-card.module.css';
import { useAuth } from '../../Authentication/AuthContext.tsx';

const CharCard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { id = '' } = useParams<{ id: string }>();
  const { data: character, isLoading, error } = useGetCharacterQuery(id);

  if (isLoading) return <h3>Loading a character card...</h3>;
  if (error)
    return (
      <h2>Error: {error instanceof Error ? error.message : 'Unknown error'}</h2>
    );
  if (!character) return <p>Character not found</p>;

  const handleFavoriteAction = () => {
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }
    // TODO: Add logic to add/remove favorites
  };

  return (
    <div className={s.charCard}>
      <h2 className={s.characterName}>{character.name}</h2>
      <div className={s.cardContent}>
        <img
          className={s.characterImage}
          src={character.imageUrl}
          alt={character.name}
        />
        <div className={s.characterInfo}>
          <ul>
            <li>
              <span className={s.staticData}>Birth Year:</span>{' '}
              {character.birth_year}
            </li>
            <li>
              <span className={s.staticData}>Eye Color:</span>{' '}
              {character.eye_color}
            </li>
            <li>
              <span className={s.staticData}>Gender:</span> {character.gender}
            </li>
            <li>
              <span className={s.staticData}>Hair Color:</span>{' '}
              {character.hair_color}
            </li>
            <li>
              <span className={s.staticData}>Height:</span> {character.height}{' '}
              cm
            </li>
            <li>
              <span className={s.staticData}>Mass:</span> {character.mass} kg
            </li>
            <li>
              <span className={s.staticData}>Skin Color:</span>{' '}
              {character.skin_color}
            </li>
            <li>
              <span className={s.staticData}>Films:</span>
              {character.films.map((filmUrl, index) => (
                <div key={index}>
                  <FilmInfo filmUrl={filmUrl} />
                </div>
              ))}
            </li>
            <li>
              <span className={s.staticData}>Homeworld:</span>
              <PlanetInfo planetUrl={character.homeworld} />
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
