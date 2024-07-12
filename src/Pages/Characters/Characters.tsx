import { useEffect, useState } from 'react';
import {
  SW_CHARACTERS,
  IMAGE_CHARS_URL,
} from '../../utils/Constants/constants.ts';
import { getApiData } from '../../utils/API/network.ts';
import styles from './characters.module.css';

interface Character {
  name: string;
  url: string;
  imageUrl: string;
}

interface ApiResponse {
  results: Character[];
}

const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response: ApiResponse = await getApiData(SW_CHARACTERS);
        const charactersList: Character[] = response.results.map(
          ({ name, url }) => ({
            name,
            url,
            imageUrl: `${IMAGE_CHARS_URL}${url.split('/').slice(-2)[0]}.jpg`,
          })
        );
        setCharacters(charactersList);
      } catch (error) {
        console.error('Error fetching characters:', error);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <section className={styles['characters-list']}>
      {characters.map(({ name, imageUrl }) => (
        <div key={name} className={styles['character-card']}>
          <div className={styles['character-image']}>
            <img src={imageUrl} alt={name} />
          </div>
          <h3 className={styles['character-name']}>{name}</h3>
        </div>
      ))}
    </section>
  );
};

export default Characters;
