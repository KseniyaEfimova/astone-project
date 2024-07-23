import React from 'react';
import { useGetSomeCharactersQuery } from '../../slices/api-slice.ts';
import { CharacterWithImage } from '../../types/star-wars-api-types.ts';
import s from './characters.module.css';
import { useNavigate } from 'react-router-dom';

export interface CharCardProps {
  charactersData?: CharacterWithImage[];
}

const Characters = ({ charactersData }: CharCardProps) => {
  const navigate = useNavigate();
  const { data: characters, isLoading, error } = useGetSomeCharactersQuery();

  const displayCharacters = charactersData || characters || [];

  if (!displayCharacters) return <p>Characters not found</p>;
  if (isLoading) return <h3>Loading a few character cards...</h3>;
  if (error)
    return (
      <h2>Error: {error instanceof Error ? error.message : 'Unknown error'}</h2>
    );

  const handleShowCharacter = (character: CharacterWithImage) => {
    navigate('/character/' + character.id);
  };

  return (
    <section className={s['characters-list']}>
      {displayCharacters.map((character: CharacterWithImage) => (
        <div
          key={character.name}
          onClick={() => handleShowCharacter(character)}
          className={s['character-card']}
        >
          <div className={s['character-image']}>
            <img src={character.imageUrl} alt={character.name} />
          </div>
          <h3 className={s['character-name']}>{character.name} </h3>
        </div>
      ))}
    </section>
  );
};

export default React.memo(Characters);
