import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { CharacterWithImage } from '../../types/star-wars-api-types';
import s from './characters.module.css';
import { useGetSomeCharactersQuery } from '../../slices/api-slice';

const Characters = () => {
  const navigate = useNavigate();
  const { isLoading, error } = useGetSomeCharactersQuery();
  const { list: characters } = useSelector(
    (state: RootState) => state.characters
  );

  if (isLoading) return <h3>Loading a few character cards...</h3>;
  if (error)
    return (
      <h2>Error: {error instanceof Error ? error.message : 'Unknown error'}</h2>
    );
  if (!characters || characters.length === 0)
    return <p>Characters not found</p>;

  const handleShowCharacter = (character: CharacterWithImage) => {
    navigate('/character/' + character.id);
  };

  return (
    <section className={s['characters-list']}>
      {characters.map((character: CharacterWithImage) => (
        <div
          key={character.name}
          onClick={() => handleShowCharacter(character)}
          className={s['character-card']}
        >
          <div className={s['character-image']}>
            <img src={character.imageUrl} alt={character.name} />
          </div>
          <h3 className={s['character-name']}>{character.name}</h3>
        </div>
      ))}
    </section>
  );
};

export default React.memo(Characters);
