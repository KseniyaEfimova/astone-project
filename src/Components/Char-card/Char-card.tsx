import { useParams } from 'react-router-dom';
import { useGetCharacterQuery } from '../../slices/api-slice';
import FilmInfo from './Film-info.tsx';
import PlanetInfo from './Planet-info.tsx';

const CharCard = () => {
  const { id = '' } = useParams<{ id: string }>();
  const { data: character, isLoading, error } = useGetCharacterQuery(id);

  if (isLoading) return <h3>Loading a character card...</h3>;
  if (error)
    return (
      <h2>Error: {error instanceof Error ? error.message : 'Unknown error'}</h2>
    );
  if (!character) return <p>Character not found</p>;

  return (
    <>
      <section className='character-detail'>
        <h2>{character.name}</h2>
        <img src={character.imageUrl} alt={character.name} />
        <ul>
          <li>Birth Year: {character.birth_year}</li>
          <li>Eye Color: {character.eye_color}</li>
          <li>Gender: {character.gender}</li>
          <li>Hair Color: {character.hair_color}</li>
          <li>Height: {character.height} cm</li>
          <li>Mass: {character.mass} kg</li>
          <li>Skin Color: {character.skin_color}</li>
          <li>
            Films:
            {character.films.map((filmUrl, index) => (
              <div key={index}>
                <FilmInfo filmUrl={filmUrl} />
              </div>
            ))}
          </li>
          <li>
            Homeworld: <PlanetInfo planetUrl={character.homeworld} />
          </li>
        </ul>
      </section>
      <div>
        <button>Add to Favorite</button>
        <button>Remove from Favorite </button>
      </div>
    </>
  );
};

export default CharCard;
