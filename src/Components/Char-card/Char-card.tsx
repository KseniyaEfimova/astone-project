import { useNavigate, useParams } from 'react-router-dom';
import { useGetCharacterQuery } from '../../slices/api-slice';
import FilmInfo from './Film-info.tsx';
import PlanetInfo from './Planet-info.tsx';
import s from './chat-card.module.css';
import { useAuth } from '../../Authentication/Auth-context.tsx';
import { CharacterWithImage } from '../../types/star-wars-api-types.ts';

interface CharCardProps {
  characterData?: CharacterWithImage;
}

const CharCard = ({ characterData }: CharCardProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { id = '' } = useParams<{ id: string }>();
  const { data: character, isLoading, error } = useGetCharacterQuery(id);

  const displayCharacter = characterData || character;

  if (isLoading) return <h3>Loading a character card...</h3>;
  if (error)
    return (
      <h2>Error: {error instanceof Error ? error.message : 'Unknown error'}</h2>
    );
  if (!displayCharacter) return <p>Character not found</p>;

  const handleFavoriteAction = () => {
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }
    // TODO: Add logic to add/remove favorites
  };

  return (
    <div className={s.charCard}>
      <h2 className={s.characterName}>{displayCharacter.name}</h2>
      <div className={s.cardContent}>
        <img
          className={s.characterImage}
          src={displayCharacter.imageUrl}
          alt={displayCharacter.name}
        />
        <div className={s.characterInfo}>
          <ul>
            <li>
              <span className={s.staticData}>Birth Year:</span>{' '}
              {displayCharacter.birth_year}
            </li>
            <li>
              <span className={s.staticData}>Eye Color:</span>{' '}
              {displayCharacter.eye_color}
            </li>
            <li>
              <span className={s.staticData}>Gender:</span>{' '}
              {displayCharacter.gender}
            </li>
            <li>
              <span className={s.staticData}>Hair Color:</span>{' '}
              {displayCharacter.hair_color}
            </li>
            <li>
              <span className={s.staticData}>Height:</span>{' '}
              {displayCharacter.height} cm
            </li>
            <li>
              <span className={s.staticData}>Mass:</span>{' '}
              {displayCharacter.mass} kg
            </li>
            <li>
              <span className={s.staticData}>Skin Color:</span>{' '}
              {displayCharacter.skin_color}
            </li>
            <li>
              <span className={s.staticData}>Films:</span>
              {displayCharacter.films.map((filmUrl, index) => (
                <div key={index}>
                  <FilmInfo filmUrl={filmUrl} />
                </div>
              ))}
            </li>
            <li>
              <span className={s.staticData}>Homeworld:</span>
              <PlanetInfo planetUrl={displayCharacter.homeworld} />
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
