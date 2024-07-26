import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetSomeCharactersQuery } from '../../slices/api-slice';
import { setCharacters } from '../../slices/characters-slice';
import { clearSearch } from '../../slices/search-slice';
import SearchBar from '../../Components/Search-bar/Search-bar';
import CharactersWrapper from '../Characters/CharactersWrapper';

const HomePage = () => {
  const dispatch = useDispatch();
  const {
    data: initialCharacters,
    isLoading,
    error,
  } = useGetSomeCharactersQuery();

  useEffect(() => {
    dispatch(clearSearch());
    if (initialCharacters) {
      dispatch(setCharacters(initialCharacters));
    }
  }, [dispatch, initialCharacters]);

  const characterIds = initialCharacters
    ? initialCharacters.map(character => character.id)
    : [];

  if (isLoading) return <div>Loading character cards...</div>;
  if (error) return <div>Error loading character data</div>;

  return (
    <>
      <SearchBar />
      <CharactersWrapper characterIds={characterIds} isFavoritesPage={false} />
    </>
  );
};

export default React.memo(HomePage);
